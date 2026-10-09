async function saveContact() {
    const firstName = "Donald Vincent Adrian";
    const lastName = "Castro";
    const organization = "TO Edit";
    const jobTitle = "TO Edit";
    const phone = "+639175 123 456";
    const email = "castroadrian63375@gmail.com";
    const location = "Guimba, Nueva Ecija, Philippines";
    const website = "https://example.com";

    const vCard = `BEGIN:VCARD
VERSION:3.0
N:${lastName};${firstName};;;
FN:${firstName} ${lastName}
ORG:${organization}
TITLE:${jobTitle}
TEL;TYPE=CELL,VOICE:${phone}
EMAIL;TYPE=INTERNET,HOME:${email}
ADR;TYPE=WORK:;;Guimba;Nueva Ecija;;Philippines
URL:${website}
END:VCARD`;

    const file = new File(
        [vCard],
        "Donald_Vincent_Adrian_Castro.vcf",
        {
            type: "text/vcard"
        }
    );

    if (
        navigator.share &&
        navigator.canShare &&
        navigator.canShare({ files: [file] })
    ) {
        try {
            await navigator.share({
                files: [file],
                title: "Donald Vincent Adrian Castro",
                text: "Save Donald Vincent Adrian Castro as a contact"
            });

            return;
        } catch (error) {
            if (error.name === "AbortError") {
                return;
            }
        }
    }

    const blob = new Blob(
        [vCard],
        {
            type: "text/vcard;charset=utf-8"
        }
    );

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "Donald_Vincent_Adrian_Castro.vcf";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
        URL.revokeObjectURL(url);
    }, 1000);
}

async function shareCard() {
    const shareData = {
        title: "Donald Vincent Adrian Castro - Digital Card",
        text: "Connect with Donald Vincent Adrian Castro",
        url: window.location.href
    };

    if (navigator.share) {
        try {
            await navigator.share(shareData);
        } catch (error) {
            if (error.name !== "AbortError") {
                console.log("Share failed.");
            }
        }

        return;
    }

    try {
        await navigator.clipboard.writeText(window.location.href);
        alert("Digital card link copied!");
    } catch (error) {
        prompt("Copy this link:", window.location.href);
    }
}