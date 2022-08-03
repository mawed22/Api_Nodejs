const { Utilisateur } = require("../model/utilisateur");
const client = require("../db/connect");
const { ObjectID } = require("bson");

const addUsers = async(req, res) => {
    try {
        let utilisateur = new Utilisateur(
            req.body.noms,
            req.body.adresse,
            req.body.telephone
        );

        let result = await client
            .db()
            .collection("utilisateurs")
            .insertOne(utilisateur);

        res.status(200).json(result);

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

const getAllUsers = async(req, res) => {
    try {
        let cursor = client.db().collection("utilisateurs").find();
        let result = await cursor.toArray();
        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ msg: "Aucun utilsateur trouvé" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

const getUsers = async(req, res) => {
    try {
        let id = new ObjectID(req.params.id);
        let cursor = client.db().collection("utilisateurs").find({ _id: id });
        let result = await cursor.toArray();
        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ msg: "Aucun utilsateur trouvé" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

const updateUsers = async(req, res) => {
    try {
        let id = new ObjectID(req.params.id);
        let nNoms = req.body.noms;
        let nAdresse = req.body.adresse;
        let nTelephone = req.body.telephone;

        let result = await client.db().collection("utilisateurs").updateOne({ _id: id }, { $set: { noms: nNoms, adresse: nAdresse, telephone: nTelephone } });
        if (result.modifiedCount == 1) {
            res.status(200).json({ msg: "Modification réussie" });
        } else {
            res.status(404).json({ msg: "Cet utilisateur n'existe pas" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

const deleteUsers = async(req, res) => {
    try {
        let id = new ObjectID(req.params.id);

        let result = await client.db().collection("utilisateurs").deleteOne({ _id: id });
        if (result.deletedCount == 1) {
            res.status(200).json({ msg: "Suppréssion réussie" });
        } else {
            res.status(404).json({ msg: "Cet utilisateur n'existe pas" });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

module.exports = { addUsers, getAllUsers, getUsers, updateUsers, deleteUsers };