import { Router } from "express";

const router = Router();

//Atraves de una ruta trabajaremos bastante la emision de eventos

router.get("/", (req, res) => {
    res.render(
        "index",
        {
            title: "Coderchat Comunitario",
            style: "index.css"
        }
    )

});

export default router;