import * as dao from "./dao.js";
import * as likesDao from "../Tune/Likes/dao.js"
import * as socialDao from "../Tune/Social/dao.js"

export default function UserRoutes(app) {
  const createUser = async (req, res) => {
    const user = await dao.createUser(req.body);
    res.json(user);
  };

  const deleteUser = async (req, res) => {
    const { userId } = req.params;

    const user = await dao.findUserById(userId);

    try {
      await Promise.all(user.following.map(
          async (id) => await socialDao.userUnfollowsUser(userId, id)));
      await Promise.all(user.likedTracks.map(
          async (id) => await likesDao.userUnlikesTrack(userId, id)));
      await Promise.all(user.followers.map(
          async (id) => await socialDao.userUnfollowsUser(id, userId)));
    } catch (e) {
      console.warn(`Error while deleting user and relationships: ${e}`);
    }

    const status = await dao.deleteUser(userId);
    res.json(status);
  };

  const findAllUsers = async (req, res) => {
    const { role } = req.query;
    if (role) {
      const users = await dao.findUsersByRole(role);
      res.json(users);
      return;
    }
    const users = await dao.findAllUsers();
    res.json(users);
  };

  const findUserById = async (req, res) => {
    const { userId } = req.params;
    const user = await dao.findUserById(userId);
    res.json(user);
  };

  const updateUser = async (req, res) => {
    const { userId } = req.params;
    const status = await dao.updateUser(userId, req.body);
    const updatedUser = await dao.findUserById(userId);
    req.session.currentUser = updatedUser;
    res.json(updatedUser);
  };

  const register = async (req, res) => {
    const user = await dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json({ message: "Username already taken" });
      return;
    }
    const currentUser = await dao.createUser(req.body);
    req.session.currentUser = currentUser;
    res.json(currentUser);
  };

  const signIn = async (req, res) => {
    const { username, password } = req.body;
    const currentUser = await dao.findUserByCredentials(username, password);
    if (currentUser) {
      req.session.currentUser = currentUser;
      res.send(currentUser);
    } else {
      res.sendStatus(401);
    }
  };

  const signOut = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  // TODO: Redundant with findUserById
  const profile = async (req, res) => {
    const { userId } = req.params;
    const currentUser = req.session.currentUser;
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const user = await dao.findUserById(userId);
    res.json(user);
  };

  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/register", register);
  app.post("/api/users/signIn", signIn);
  app.post("/api/users/signOut", signOut);
  app.post("/api/users/profile/:userId", profile);
}
