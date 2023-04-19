const afterCreateEmailSubject = "Bine ai venit!";
const afterCreateEmailText = `Felicitări, contul tău pe Creștem.ONG a fost creat cu succes!\n
Următorul pas este să stabilești perioada de evaluare a organizației tale și să inviți persoanele pe care vrei să le implici în analiză: pot fi membri, angajați, colaboratori (permanenți), membri ai structurii de guvernanță (board/ consiliu director), voluntari și/ sau beneficiari activ implicați în organizație (implicați în activități ce țin de management și/ sau guvernanță).\n
Nu uita să incluzi și adresa ta în listă pentru a răspunde la rândul tău întrebărilor.Veți avea la dispoziție maxim o lună pentru a completa chestionarul.\n
Vei putea apoi închide evaluarea tot din contul tău și vei primi un raport cu media răspunsurilor și recomandări de resurse pentru dezvoltarea voastră organizațională. Dacă sunteți înscriși într-unul dintre programele noastre de dezvoltare, vei primi tot atunci detalii despre asistența personalizată.\n
Pentru orice întrebări sau nelămuriri, nu ezita să ne contactezi pe chat-ul de pe site sau la contact@crestem.ong.\n
Succes! Echipa Creștem.ONG`;
const afterCreateEmailHtml = `<p>Felicitări, contul tău pe Creștem.ONG a fost creat cu succes!</p>
<p>Următorul pas este să stabilești perioada de evaluare a organizației tale și să inviți persoanele pe care vrei să le implici în analiză: pot fi membri, angajați, colaboratori (permanenți), membri ai structurii de guvernanță (board/ consiliu director), voluntari și/ sau beneficiari activ implicați în organizație (implicați în activități ce țin de management și/ sau guvernanță).</p>
<p>Nu uita să incluzi și adresa ta în listă pentru a răspunde la rândul tău întrebărilor.Veți avea la dispoziție maxim o lună pentru a completa chestionarul.</p>
<p>Vei putea apoi închide evaluarea tot din contul tău și vei primi un raport cu media răspunsurilor și recomandări de resurse pentru dezvoltarea voastră organizațională. Dacă sunteți înscriși într-unul dintre programele noastre de dezvoltare, vei primi tot atunci detalii despre asistența personalizată.</p>
<p>Pentru orice întrebări sau nelămuriri, nu ezita să ne contactezi pe chat-ul de pe site sau la <a href="mailto:contact@crestem.ong">contact@crestem.ong</a>.</p>
<p>Succes! Echipa Creștem.ONG</p>`;

module.exports = {
  async afterCreate(event) {
    const { result } = event;
    try {
      await strapi.plugins["email"].services.email.send({
        to: result.email,
        subject: afterCreateEmailSubject,
        text: afterCreateEmailText,
        html: afterCreateEmailHtml,
      });
    } catch (err) {
      console.log(err);
    }
    try {
      await strapi.plugins["email"].services.email.send({
        to: "olivia.vereha@code4.ro", // get it from env variable
        subject: "Cont nou pe Crestem.ONG",
        text: `Bună,\n${result.ongName} a deschis un cont de organizație pe Creștem.ONG.\nO zi frumoasă! Echipa Creștem.ONG`,
        html: `<p>Bună,</p><p>${result.ongName} a deschis un cont de organizație pe Creștem.ONG.</p><p>O zi frumoasă! Echipa Creștem.ONG</p>`,
      });
    } catch (err) {
      console.log(err);
    }
  },
};
