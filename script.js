async function saveContact() {
    const firstName = "Eliezer Glenn";
    const lastName = "Castelo";
    const organization = "Innovation and Technology Solutions";
    const jobTitle = "Information Technology Professional";
    const phone = "+639926594206";
    const email = "casteloeliezerglenn@gmail.com";
    const location = "Guimba, Nueva Ecija, Philippines";
    const website = "https://elie.com";

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
        "Eliezer_Glenn_Castelo.vcf",
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
                title: "Eliezer Glenn Castelo",
                text: "Save Eliezer Glenn Castelo as a contact"
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
    link.download = "Eliezer_Glenn_Castelo.vcf";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
        URL.revokeObjectURL(url);
    }, 1000);
}

async function shareCard() {
    const shareData = {
        title: "Eliezer Glenn Castelo - Digital Card",
        text: "Connect with Eliezer Glenn Castelo",
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