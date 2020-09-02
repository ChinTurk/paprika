#!/usr/bin/env node
const fs = require("fs");
// eslint-disable-next-line import/no-extraneous-dependencies
const shell = require("shelljs");
// eslint-disable-next-line import/no-extraneous-dependencies
const reactDocs = require("react-docgen");

const skipPackages = ["helpers", "Stylers", "Tokens", "Guard", "Icon", "Overlay", "Select", "Calendar", "Constants"];

const githubIssueBody = encodeURIComponent(`
# Help wanted

## Please write your question.
*A clear and concise description of what the question is*

## Additional context
*Add any other context or screenshots about your question here.*
`);

const renderReadmeTemplate = ({
  displayName = "",
  name = "",
  description = "** require description **",
  content = "** require content **",
  props = "",
  version = "",
}) => {
  return `
<!-- autogenerated don't modify -->

# ${name} - ${version}

## Description
${description}

## Installation

\`\`\`
yarn add ${name}
\`\`\`

or with npm:

\`\`\`
npm install ${name}
\`\`\`

## Props 
${props}

<!-- autogenerated don't modify -->
${content}

## Links
- [Storybook showcase](https://paprika.highbond.com/?path=/story/${name.split("/")[1].toLowerCase()}--showcase)
- [Github source code](https://github.com/acl-services/paprika/tree/master/packages/${displayName}/src)
- [Github create issue](https://github.com/acl-services/paprika/issues/new?label=[]&title=${name}%20[help]:%20your%20short%20description&body=${githubIssueBody})
- [ChangeLog](https://github.com/acl-services/paprika/tree/master/packages/${displayName}/CHANGELOG.md)
`;
};

const initAutoReadme = ({ path, content }) => {
  fs.writeFileSync(
    `${path}/README.md`,
    `<!-- content -->
${content}
<!-- eoContent -->
      `,
    "utf8"
  );
};

const createPropsTable = ({ info }) => {
  if (!info || !info.props) return "";

  const table = [
    `### ${info.displayName} \n`,
    "| Prop  | Type  | required  | default   | Description |\n",
    "|-------|-------| --------  | --------- | ----------- |\n",
  ];

  Object.keys(info.props).map(key => {
    const v = info.props[key] || {};
    let type = "-";
    if ("type" in v) {
      if (v.type.name === "union") {
        type = `[${v.type.value.map(i => i.name)}]`;
      } else {
        type =
          // eslint-disable-next-line no-nested-ternary
          v.type.name !== "enum"
            ? v.type.name
            : Array.isArray(v.type.value)
            ? `[${v.type.value.map(i => i.value)}]`
            : v.type.value;
      }
    }

    const required = "required" in v ? v.required.toString() : " ";
    const defaultValue = "defaultValue" in v ? v.defaultValue.value : "-";
    const description = "description" in v ? v.description : " ";

    return table.push(`|${key}|${type}|${required}|${defaultValue}| ${description}|\n`);
  });

  return table.join("");
};

const extractCorrectComponentDefinition = ({ desireDefinition, arrayOfComponentsDefinitions }) => {
  const definition = arrayOfComponentsDefinitions.filter(def => def.displayName === desireDefinition);

  if (!definition.length) {
    console.log(
      `sub-component with displayName === ${desireDefinition}, more found: ${JSON.stringify(
        arrayOfComponentsDefinitions.map(i => i.displayName)
      )}`
    );
  }

  return definition[0];
};

const processPropTables = ({ info, folder, path, paprikaDocs = null }) => {
  console.log("Generating README files...", folder);
  const propsTable = [];
  // const autoGeneratedContent = readmeTemplate({ name, description, content: contentExtracted });

  if (info) {
    propsTable.push(createPropsTable({ info }));
  }

  // you can define on packages.json a property named paprikaDocs with an attribute subComponent to list
  // extra component that you might want to create and render on the table.
  if (paprikaDocs && "subComponents" in paprikaDocs) {
    paprikaDocs.subComponents.forEach(subComponent => {
      const subComponentContent = fs.readFileSync(`${path}/src/components/${subComponent}/${subComponent}.js`, "utf8");
      const arrayOfComponentsDefinitions = reactDocs.parse(
        subComponentContent,
        reactDocs.resolver.findAllComponentDefinitions
      );
      let _info = extractCorrectComponentDefinition({
        desireDefinition: subComponent,
        arrayOfComponentsDefinitions,
      });

      if (_info) {
        propsTable.push(createPropsTable({ info: _info }));
      } else {
        _info = extractCorrectComponentDefinition({
          desireDefinition: `${info.displayName}.${subComponent}`,
          arrayOfComponentsDefinitions,
        });

        propsTable.push(createPropsTable({ info: _info }));
      }
    });
  }

  return propsTable;
};

shell.ls("packages").forEach(folder => {
  if (!skipPackages.includes(folder)) {
    const path = `./packages/${folder}`;

    try {
      // data from package.json
      const { paprikaDocs = null, name, version, description = "required description" } = JSON.parse(
        fs.readFileSync(`${path}/package.json`, "utf8")
      );

      const content = fs.readFileSync(`${path}/README.md`, "utf8");
      const componentContent = fs.readFileSync(`${path}/src/${folder}.js`, "utf8");
      const arrayOfComponentsDefinitions = reactDocs.parse(
        componentContent,
        reactDocs.resolver.findAllComponentDefinitions
      );

      const info = extractCorrectComponentDefinition({ desireDefinition: folder, arrayOfComponentsDefinitions });

      if (!info) return;

      if (content.search(/<!-- content/g) >= 0) {
        // the .md file has the content tag, let's extract the content
        const contentExtracted = content.match(/<!-- content -->[\s\S]*?<!-- eoContent -->/g);
        const propTables = processPropTables({
          info,
          componentContent,
          path,
          paprikaDocs,
          folder,
          content,
        });

        const template = renderReadmeTemplate({
          displayName: info.displayName,
          name,
          description,
          content: contentExtracted,
          props: propTables.join("\n\n"),
          version,
        });

        fs.writeFileSync(`${path}/README.md`, template, { encoding: "utf8", flag: "w" });
        return;
      }

      initAutoReadme({ path, content });
    } catch (e) {
      console.warn(e);
    }
  }
});

shell.exec('prettier "**/*.+(md)" --write');
