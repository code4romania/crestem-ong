import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { MentorDimensionModel } from "@/services/api/types";
import { UserIcon } from "@heroicons/react/20/solid";
import { Link } from "@tanstack/react-router";

const MentorCard = ({
  id,
  firstName,
  lastName,
  dimensions,
  avatarUrl,
}: {
  id: string;
  firstName: string;
  lastName: string;
  dimensions: MentorDimensionModel[];
  avatarUrl?: string;
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-col items-center">
          <Avatar className="h-32 w-32">
            <AvatarImage src={avatarUrl} alt={`${firstName} ${lastName}`} />
            <AvatarFallback>
              {[firstName?.[0], lastName?.[0]].filter(Boolean).join("") ?? "-"}
            </AvatarFallback>
          </Avatar>
          <div className="text-lg font-semibold mt-4">
            {firstName} {lastName}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Button asChild>
          <Link to={`/users/$userId`} params={{ userId: id }}>
            <UserIcon className="h-5 w-5 inline mr-2" />
            <span className="inline">Vezi profil</span>
          </Link>
        </Button>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2 px-2 w-full items-center justify-center">
        {dimensions?.map((dimension) => (
          <Badge key={dimension.name} variant="secondary">
            {dimension.name}
          </Badge>
        ))}
      </CardFooter>
    </Card>
  );
};

export default MentorCard;
