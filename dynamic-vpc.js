module.exports = () => {
    const YAML = require("yamljs");

    // define SECURITY_GROUP_IDS --> security id's  separated by comma
    // define SUBNET_IDS --> subnet id's  separated by comma

    let securityGroups = process.env.SECURITY_GROUP_IDS;
    securityGroups = securityGroups ? securityGroups.split(",") : [];

    let subnets = process.env.SUBNET_IDS;
    subnets = subnets ? subnets.split(",") : [];

    let str = YAML.stringify(
        {
            securityGroupIds: securityGroups,
            subnetIds: subnets
        },
        null,
        2
    );

    return YAML.parse(str);
};
