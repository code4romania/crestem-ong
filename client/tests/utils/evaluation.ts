export const fillEvaluation = async (page) => {
  await page.getByRole("button", { name: "Începe evaluarea" }).click();
  await page
    .getByText(
      "Există viziune și misiune scrise și acestea sunt urmărite în practică. Lipsește "
    )
    .click();
  await page
    .getByText(
      "Există un plan strategic scris, însă nu este operaționalizat/ implementat în tot"
    )
    .click();
  await page
    .getByText(
      "Structura de guvernanță are o înțelegere limitată asupra rolului său. De obicei "
    )
    .click();
  await page
    .getByText(
      "Există criterii pentru structura de guvernanță însă toate persoanele implicate a"
    )
    .click();
  await page
    .getByText(
      "Există politici dedicate privind etica/ valorile, dar nu sunt implementate în to"
    )
    .click();
  await page.getByRole("textbox").click();
  await page.getByRole("textbox").fill("comentariu 1");
  await page.getByRole("button", { name: "Continuă" }).click();
  await page
    .getByText(
      "Organizația cunoaște principalele obligații prevăzute de lege. Are o persoană cu"
    )
    .click();
  await page
    .getByText(
      "Fiecare persoană este responsabilă de propriile proiecte/ activități. Există o o"
    )
    .click();
  await page
    .getByText(
      "Planificarea financiară este asigurată coerent pentru anul în curs."
    )
    .click();
  await page
    .getByText(
      "Capacitate parțială de a asigura venit sustenabil/ de lungă durată. Există cel p"
    )
    .click();
  await page
    .locator("#root div")
    .filter({
      hasText:
        "Organizația este dependentă de o singură sursă de venit și nu este în căutare de",
    })
    .nth(3)
    .click();
  await page.getByRole("textbox").click();
  await page.getByRole("textbox").fill("test comentariu");
  await page.getByRole("button", { name: "Continuă" }).click();
  await page
    .getByText(
      "Există informații parțiale despre proiecte/ programe anterioare. Informația este"
    )
    .click();
  await page
    .getByText(
      "Există un sistem de date intern (ex. server/ drive), totuși nu există o procedur"
    )
    .click();
  await page
    .getByText(
      "Nu este implementat un sistem de management.Există o practică minimă de lucru cu"
    )
    .click();
  await page
    .getByText(
      "Experiențele anterioare și lecțiile învățate sunt folosite pentru a planifica ac"
    )
    .click();
  await page
    .getByText(
      "Organizația nu are un raport anual.Sunt publicate câteva informații (articole/ s"
    )
    .click();
  await page
    .locator("form div")
    .filter({
      hasText:
        "Te rugăm să argumentezi selecțiile făcute pentru indicatorul Managementul inform",
    })
    .click();
  await page.getByRole("textbox").fill("test coment");
  await page.getByRole("button", { name: "Continuă" }).click();
  await page
    .getByText(
      "Nu există o practică clară de monitorizare și evaluare la nivel de organizațieMo"
    )
    .click();
  await page
    .getByText(
      "Chiar dacă organizația monitorizează și evaluează obiectivele activităților, o f"
    )
    .click();
  await page
    .getByText(
      "Nu se realizează monitorizare și evaluare în cadrul organizației.Există câteva p"
    )
    .click();
  await page
    .getByText(
      "Nu există un proces de reflecție sau învățare.Practici limitate privind privind "
    )
    .click();
  await page
    .getByText(
      "Implementare clară și documentată a rezultatelor învățării pentru toate proiecte"
    )
    .click();
  await page.getByRole("textbox").click();
  await page.getByRole("textbox").fill("test");
  await page.getByRole("button", { name: "Continuă" }).click();
  await page
    .getByText(
      "O structură formală există în organizație. Cu toate acestea, structura nu este r"
    )
    .click();
  await page
    .getByText(
      "Rolurile și responsabilitățile sunt definite în mod formal, dar nu sunt respecta"
    )
    .click();
  await page
    .getByText(
      "Organizația știe ce abilități/ expertiză îi lipsesc, dar nu încearcă în mod acti"
    )
    .click();
  await page
    .locator("#root div")
    .filter({
      hasText:
        "Nu există nicio politică de luare a deciziilor. Toate deciziile sunt luate ad ho",
    })
    .nth(3)
    .click();
  await page
    .getByText(
      "Organizația consultă viziunea și misiunea în luarea deciziilor. Cu toate acestea"
    )
    .first()
    .click();
  await page.getByRole("textbox").click();
  await page.getByRole("textbox").fill("asdasd");
  await page.getByRole("button", { name: "Continuă" }).click();
  await page
    .getByText(
      "Nu există niciun mix între leadership și management.Există un oarecare mix, cu a"
    )
    .click();
  await page
    .getByText(
      "Există un oarecare mix, cu accent pe management. Abilitățile de leadership lipse"
    )
    .click();
  await page
    .getByText(
      "Leadership-ul este dependent de o persoană, maxim două care îi implică și pe cei"
    )
    .click();
  await page
    .getByText(
      "Motivația este recunoscută ca parte integrală a leadership-ului. Liderii își ded"
    )
    .click();
  await page
    .getByText(
      "Nu există o abordare sistematică asupra creșterii liderilor, dar se întâmplă din"
    )
    .click();
  await page
    .getByText(
      "Leadership-ul organizației împuternicește oamenii să se dezvolte, dar nu într-o "
    )
    .click();
  await page
    .locator("div")
    .filter({
      hasText:
        /^Te rugăm să argumentezi selecțiile făcute pentru indicatorul Leadership$/,
    })
    .click();
  await page.getByRole("textbox").click();
  await page.getByRole("textbox").fill("test");
  await page.getByRole("button", { name: "Continuă" }).click();
  await page
    .getByText(
      "Există o înțelegere generală limitată, în mare parte informală, asupra practicil"
    )
    .click();
  await page
    .getByText(
      "Nu există astfel de practici.Există parțial un proces de onboarding, dar este fa"
    )
    .click();
  await page
    .getByText(
      "Nu există astfel de practiciExistă puține practici pentru dezvoltare, realizate "
    )
    .click();
  await page
    .getByText(
      "Există practici/ proceduri clare, dar nu există o urmare a evaluării."
    )
    .click();
  await page
    .getByText(
      "Organizația recunoaște în totalitate munca oamenilor, atât formal (de ex. perfor"
    )
    .click();
  await page.getByRole("textbox").click();
  await page.getByRole("textbox").fill("test");
  await page.getByRole("button", { name: "Continuă" }).click();
  await page
    .getByText(
      "Există câteva practici pentru identificarea de nevoi, dar fără criterii/ metodol"
    )
    .click();
  await page
    .getByText(
      "Nicio implicare a persoanelor beneficiare în organizație.Implicare limitată, în "
    )
    .click();
  await page
    .getByText(
      "Persoanele beneficiare sunt implicate într-o anumită măsură în activități, în ma"
    )
    .click();
  await page
    .getByText(
      "Noile persoane beneficiare sunt selectate doar pentru activități specifice, punc"
    )
    .click();
  await page
    .getByText(
      "Persoanele beneficiare sunt împuternicite să acționeze însă doar în activități p"
    )
    .click();
  await page.getByRole("textbox").click();
  await page.getByRole("textbox").fill("asdasdasd");
  await page.getByRole("button", { name: "Continuă" }).click();
  await page
    .getByText(
      "Advocacy este pe agenda organizației, dar în mare parte la nivel reactiv, fără o"
    )
    .click();
  await page
    .getByText(
      "Organizația consultă în mod constant persoanele beneficiare pentru acțiunile de "
    )
    .click();
  await page
    .getByText(
      "Organizația are abilitățile de bază în advocacy și networking și investește resu"
    )
    .click();
  await page
    .getByText(
      "Organizația are parteneriate cu diferite entități, în special din zona privată, "
    )
    .click();
  await page
    .getByText(
      "Implicare clară, proactivă în cadrul a diferite structuri, mai degrabă implicată"
    )
    .click();
  await page
    .locator("form div")
    .filter({
      hasText:
        "Te rugăm să argumentezi selecțiile făcute pentru indicatorul Advocacy și partene",
    })
    .click();
  await page.getByRole("textbox").fill("asdasdad");
  await page
    .frameLocator('[data-testid="dialog_iframe"]')
    .locator("._94ve")
    .click();
  await page.getByRole("button", { name: "Continuă" }).click();
  await page
    .getByText(
      "Identitate vizuală/ brand există, dar fără o viziune clară de utilizare și nu to"
    )
    .click();
  await page
    .locator("#root div")
    .filter({
      hasText:
        "Nu există un plan de comunicare. Organizația acționează doar conform regulamente",
    })
    .nth(3)
    .click();
  await page
    .getByText(
      "Organizația folosește diferite canale de comunicare în funcție de ce comunică în"
    )
    .click();
  await page
    .getByText(
      "Colaborare clară cu mass media, informarea lor constantă prin intermediul mai mu"
    )
    .click();
  await page
    .getByText(
      "Există transparență și responsabilitate, însă nu către toate persoanele cointere"
    )
    .click();
  await page.getByRole("textbox").click();
  await page.getByRole("textbox").fill("asd");
  await page.getByRole("button", { name: "Trimite" }).click();
  await page.getByText("Răspunsurile tale au fost trimise cu succes!").click();
};
