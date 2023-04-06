function passwordStrength(password:string) {
    // Define a set of regular expressions to match against the password
    const regex: any = {
        lowercase: /[a-z]/,
        uppercase: /[A-Z]/,
        number: /[0-9]/,
        symbol: /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/,
        length: /.{12,}/,
    };

    // Count the number of regex patterns the password matches
    let matches = 0;
    for (let key in regex) {
        if (password.match(regex[key])) {
            matches++;
        }
    }

    // Evaluate password strength based on number of matches
    let strength, numMatches;
    if (matches === 5) {
        strength = "Very strong";
    } else if (matches >= 4) {
        strength = "Strong";
    } else if (matches >= 3) {
        strength = "Moderate";
    } else if (matches >= 2) {
        strength = "Weak";
    } else {
        strength = "Very weak";
    }

    // Return an object with both the strength and number of matches
    numMatches = matches;
    return { strength, numMatches };
}

export default passwordStrength