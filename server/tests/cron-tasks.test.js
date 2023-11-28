const { updateExpiredReports } = require("../config/cron-tasks");

const sendTemplatedEmailMock = jest.fn().mockReturnValue(Promise.resolve());
const updateMock = jest.fn().mockReturnValue(Promise.resolve());
const dummyUser = {
    email: "dummy@example.com"
}

const dummyEvaluations = [
    Promise.resolve([
        1,
        {
            email: "evaluation@example.com"
        }
    ]),
    Promise.resolve([
        2,
        {
            email: "evaluation@dummy.com"
        }
    ]),
];

const deadline = new Date(Date.UTC(2023, 10, 22));

beforeEach(async function () {
    jest.useFakeTimers("modern");
});

afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
});

it.each([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24])("should send emails when %p hours until deadline", async (remainingHours) => {
    // Arrange
    var fakeNow = addHours(deadline, -remainingHours);
    jest.setSystemTime(fakeNow);

    const report = {
        deadline: formatAsString(deadline),
        user: dummyUser,
        evaluations: {
            entries: jest.fn().mockReturnValue(dummyEvaluations)
        }
    };

    const mockStrapi = getMockedStrapi(report);

    // Act
    await updateExpiredReports.task({ strapi: mockStrapi })

    // Assert
    expect(mockStrapi.plugin().service().sendTemplatedEmail).toBeCalledTimes(3);
    expect(mockStrapi.plugin().service().sendTemplatedEmail).toHaveBeenNthCalledWith(1, { to: "dummy@example.com" }, { templateReferenceId: 1 });
    expect(mockStrapi.plugin().service().sendTemplatedEmail).toHaveBeenNthCalledWith(2, { to: "evaluation@example.com" }, { templateReferenceId: 2 }, { REPORT: report });
    expect(mockStrapi.plugin().service().sendTemplatedEmail).toHaveBeenNthCalledWith(3, { to: "evaluation@dummy.com" }, { templateReferenceId: 2 }, { REPORT: report });

});

it("should not send emails when more than 24 hours until deadline", async () => {
    // Arrange
    var fakeNow = addHours(deadline, -25);
    jest.setSystemTime(fakeNow);

    const report = {
        deadline: formatAsString(deadline),
        user: dummyUser,
        evaluations: {
            entries: jest.fn().mockReturnValue(dummyEvaluations)
        }
    };

    const mockStrapi = getMockedStrapi(report);

    // Act
    await updateExpiredReports.task({ strapi: mockStrapi })

    // Assert
    expect(mockStrapi.plugin().service().sendTemplatedEmail).not.toHaveBeenCalled();
});

it("should mark as finished when deadline exceeded", async () => {
    // Arrange
    var fakeNow = addHours(deadline, 1);
    jest.setSystemTime(fakeNow);

    const report = {
        id: "12-3-5555-78777",
        deadline: formatAsString(deadline),
        user: dummyUser,
        evaluations: {
            entries: jest.fn().mockReturnValue(dummyEvaluations)
        }
    };

    const mockStrapi = getMockedStrapi(report);

    // Act
    await updateExpiredReports.task({ strapi: mockStrapi });

    // Assert
    expect(mockStrapi.entityService.update).toHaveBeenCalledWith("api::report.report", "12-3-5555-78777", {
        data: {
            finished: true,
        },
    });
});

it("should ignore reports without deadline", async () => {
    // Arrange

    const report = {
        id: "12-3-5555-78777",
        user: dummyUser,
        evaluations: {
            entries: jest.fn().mockReturnValue(dummyEvaluations)
        }
    };

    const mockStrapi = getMockedStrapi(report);

    // Act
    await updateExpiredReports.task({ strapi: mockStrapi });

    // Assert
    expect(mockStrapi.entityService.update).not.toHaveBeenCalled();
    expect(mockStrapi.plugin().service().sendTemplatedEmail).not.toHaveBeenCalled();
});

function addHours(date, hours) {
    const dateCopy = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    dateCopy.setHours(dateCopy.getHours() + hours);
    return dateCopy;
}

function formatAsString(date) {
    return `${date.getFullYear()}-${(date.getMonth() + 1)}-${date.getDate()}`;
}

function getMockedStrapi(report) {
    return {
        plugin: jest.fn().mockReturnValue({
            service: jest.fn().mockReturnValue({
                sendTemplatedEmail: sendTemplatedEmailMock
            })
        }),
        entityService: {
            findMany: jest.fn().mockReturnValue(Promise.resolve({
                entries: jest.fn().mockReturnValue([Promise.resolve([1, report])])
            })),
            update: updateMock
        }
    };
}