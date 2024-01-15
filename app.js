const express = require("express");
const app = express();

// Middleware pour vérifier l'heure de la demande
const checkBusinessHours = (req, res, next) => {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const hourOfDay = now.getHours();

  if (dayOfWeek >= 1 && dayOfWeek <= 5 && hourOfDay >= 9 && hourOfDay < 17) {
    // Heures ouvrables
    next();
  } else {
    res.send(
      "L'application est disponible uniquement pendant les heures ouvrables (du lundi au vendredi, de 9h à 17h)."
    );
  }
};

// Utilisez le middleware pour toutes les routes
app.use(checkBusinessHours);

// Configuration pour utiliser EJS comme moteur de modèle
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// Routes
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/services", (req, res) => {
  res.render("services");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
