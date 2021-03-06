module.exports = async (client, message, args) => {
    const Canvas = require('canvas');
    let width = 550,
        height = 325,
        fontColour = "#ffffff",
        fontSize = "20px",
        userdb;
    Canvas.registerFont("fonts/Opensans-bold.ttf", { family: 'Open Sans', weight: 'bold' })
    Canvas.registerFont("fonts/Opensans-regular.ttf", { family: 'Open Sans' })
    function fragmentText(text, maxWidth) {
        let words = text.split(' '),
            lines = [],
            line = "";
        if (ctx.measureText(text).width < maxWidth) {
            return [text];
        }
        while (words.length > 0) {
            while (ctx.measureText(words[0]).width >= maxWidth) {
                let tmp = words[0];
                words[0] = tmp.slice(0, -1);
                if (words.length > 1) {
                    words[1] = tmp.slice(-1) + words[1];
                } else {
                    words.push(tmp.slice(-1));
                }
            }
            if (ctx.measureText(line + words[0]).width < maxWidth) {
                line += words.shift() + " ";
            } else {
                lines.push(line);
                line = "";
            }
            if (words.length === 0) {
                lines.push(line);
            }
        }
        return lines;
    }

    if (!userdb) {
        userdb = {
            desc: "",
            link: "",
            email: "",
            name: "",
            age: ""
        }
    };

    let dscp = userdb.desc || "Nie ustawiono!";
    let link = userdb.link || "Nie ustawiono!";
    let email = userdb.email || "Nie ustawiono!";
    let name = userdb.name || "Nie ustawiono!";
    let age = userdb.age || "Nie ustawiono!";


    function roundedRect(ctx, x, y, width, height, radius) {
        ctx.beginPath();
        ctx.moveTo(x, y + radius);
        ctx.lineTo(x, y + height - radius);
        ctx.arcTo(x, y + height, x + radius, y + height, radius);
        ctx.lineTo(x + width - radius, y + height);
        ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius);
        ctx.lineTo(x + width, y + radius);
        ctx.arcTo(x + width, y, x + width - radius, y, radius);
        ctx.lineTo(x + radius, y);
        ctx.arcTo(x, y, x, y + radius, radius);
        ctx.stroke();
    }
    const avatar = await Canvas.loadImage(message.author.displayAvatarURL({ format: 'png' }));

    const canvas = Canvas.createCanvas(550, 300)
    const ctx = canvas.getContext("2d")

    ctx.beginPath(0, 0,);
    ctx.rect(0, 0, 3000, 3000);
    ctx.fillStyle = "#171717"
    ctx.fill()


    roundedRect(ctx, 362, 90, 170, 45, 10);
    ctx.fillStyle = "#4a4a4a"
    ctx.fill()

    roundedRect(ctx, 362, 165, 170, 45, 10);
    ctx.fillStyle = "#4a4a4a"
    ctx.fill()

    roundedRect(ctx, 362, 240, 170, 45, 10);
    ctx.fillStyle = "#4a4a4a"
    ctx.fill()
    let grd = ctx.createLinearGradient(0, 0, 200, 0);
    grd.addColorStop(0, client.color);
    grd.addColorStop(1, "#7417ff");

    ctx.beginPath(0, 0,);
    ctx.rect(0, 0, 3000, 75);
    ctx.fillStyle = grd
    ctx.fill()

    ctx.beginPath();
    roundedRect(ctx, 0, 78, 350, 220, 5);
    ctx.fillStyle = "#202020"
    ctx.fill()



    ctx.font = 'bold 28px "Open Sans"';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(message.author.username, 75, 45);
    ctx.font = '14px "Open Sans"';
    ctx.fillText("#" + message.author.discriminator, 75, 65)

    ctx.beginPath();
    ctx.arc(35, 35, 25, 0, Math.PI * 2, true);

    ctx.font = 'bold 22px "Open Sans"';
    ctx.fillStyle = '#ffffff';
    ctx.fillText("Opis:", 10, 105, 350)
    let lines = fragmentText(dscp, 350)
    lines.forEach(function (item, i) {
        ctx.font = '20px "Open Sans"';
        ctx.fillStyle = '#ffffff';
        if (item.startsWith(" ")) {
            ctx.fillText(item.slice(1), 10, (i + 6.7) * parseInt(fontSize))
        }
        else {
            ctx.fillText(item, 10, (i + 6.5) * parseInt(fontSize))
        }
    })

    ctx.font = '20px "Open Sans"';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(email, 378, 120);
    ctx.fillText(link, 378, 195)
    ctx.fillText(name, 378, 270)
    ctx.closePath();
    ctx.clip();




    ctx.drawImage(avatar, 10, 10, 50, 50);
    const attachment = new client.disc.MessageAttachment(canvas.toBuffer(), 'profil.jpg');
    message.channel.send(attachment)
}

module.exports.help = {
    name: "test",
    description: "ye",
    aliases: [],
    category: "dev", // Tools, moderation, 4fun, dev
    perm: "dev" // user, admin, mod, tester, dev
}