import SocialRoutes from "./Social/routes.js";
import TrackRoutes from "./Tracks/routes.js";
import LikeRoutes from "./Likes/routes.js";

export default function TuneRoutes(app) {
  SocialRoutes(app);
  TrackRoutes(app);
  LikeRoutes(app);
}