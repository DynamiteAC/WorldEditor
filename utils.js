function getOrCreate(val, path, defaultVal) {
    var pathParts = path.split("."); // "custom.name"
    var current = val;
    for (var i = 0; i < pathParts.length; i++) {
        if (i + 1 == pathParts.length) {
            if (!current[pathParts[i]]) {
                // If not already there, create as empty string and return it.
                current[pathParts[i]] = defaultVal;
            }
        } else {
            if (!current[pathParts[i]]) {
                current[pathParts[i]] = {};
            }
        }
        current = current[pathParts[i]];
    }
    return current;
}