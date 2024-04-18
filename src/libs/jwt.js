import { SECRET } from "../server/config.js";
import jwt from "jsonwebtoken";

export function createAccessToken(payload){
    return new Promise((resolve, reject) => {
        jwt.sign(payload, SECRET, {expiresIn: '15m'}, (err, token) => {
            if(err) reject(err);
            resolve(token);
        });
    });
};