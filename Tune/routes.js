import SocialRoutes from "./Social/routes.js";
import TrackRoutes from "./Tracks/routes.js";

export default function TuneRoutes(app) {
  SocialRoutes(app);
  TrackRoutes(app);
}