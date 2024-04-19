export default function Health(app) {
  app.get("/health", (req, res) => {
    res.send("Server is Healthy!");
  });
}