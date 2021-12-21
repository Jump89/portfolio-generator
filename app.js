const fs = require('fs'); 
const inquirer = require('inquirer');
const generatePage = require('./src/page-template');

const promptUser = () => {
return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name?',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log ('Please enter your name!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'github',
      message: 'What is your GitHub Username',
      validate: githubInput => {
        if (githubInput) {
          return true;
        } else {
          console.log ('Please enter your GitHub Username');
          return false;
        }
      }
    },
    {
      type: 'confirm',
      name: 'confirmAbout',
      message: 'Would you like to enter some information about yourself for an About section?',
      default: true
    },
    {
      type: 'input',
      name: 'about',
      massage: ' Provide some information about yourself:',
      when: ({ confirmAbout }) => {
        if (confirmAbout) {
          return true;
        } else {
          return false;
        }
      }
    }
  ]);
};

const promptProject = portfolioData => {
  console.log(`
  ==================
  Add a New Project
  ==================
  `);
  // if there's no ' projects' array property, create one
  if (!portfolioData.projects) {
    portfolioData.projects = [];
   }
  return inquirer.prompt ([
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of your project?',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log ('Please enter your project name!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'description',
      message: 'Provide a description of the project (Required)',
      validate: descriptionInput => {
        if (descriptionInput) {
          return true;
        } else {
          console.log ('Please enter a valid description!');
          return false;
        }
      }
    },
    {
      type: 'checkbox',
      name: 'languages',
      message: 'What did you build this project with? (Check all that apply)',
      choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', ' Node']
    },
    {
      type: 'input',
      name: 'link',
      message: 'Enter the GitHub link to your project.(Required)',
      validate: linkInput => {
        if (linkInput) {
          return true;
        } else {
          console.log ('Please enter the GitHub Link');
          return false;
        }
      }
    },
    {
      type: 'confirm',
      name: 'feature',
      message: 'Would you like to feature this project?',
      default: false
    },
    {
      type: 'confirm',
      name: 'confirmAddProject',
      message: 'Would you like to enter another project?',
      default: false
    }
  ])
    .then(projectData => {
      portfolioData.projects.push(projectData);
      if(projectData.confirmAddProject) {
        return promptProject(portfolioData);
      } else {
        return portfolioData;
      }
  });
};

promptUser()
.then(promptProject)
.then(portfolioData => {
  console.log(portfolioData);
});

















// portfolioData.projects = [];
//  // if there's no ' projects' array property, create one
//  if (!portfolioData.projects) {
//   portfolioData.projects = [];
//  }






// // notice the lack of parentheses around profiledataArr parameter?
// const printProfileData = profileDataArr => {
//     //This
//     for (let i = 0; i < profileDataArgs.length; i++) {
//         console.log(profileDataArr[i]);
//     }
//     console.log('===========');

//     // Is the same as this ......
//     profileDataArr.forEach((profileItem) => console.log(profileItem));
// };

// printProfileData(profileDataArgs);