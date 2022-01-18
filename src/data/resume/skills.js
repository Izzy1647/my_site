// TODO: Add Athletic Skills, Office Skills,
// Data Engineering, Data Science, ML Engineering, ... ?

const skills = [
  {
    title: 'Javascript',
    competency: 9,
    category: ['Web Development', 'Languages', 'Javascript'],
  },
  {
    title: 'Node.JS',
    competency: 6,
    category: ['Web Development', 'Javascript'],
  },
  {
    title: 'React',
    competency: 7,
    category: ['Web Development', 'Javascript'],
  },
  {
    title: 'Vue',
    competency: 6,
    category: ['Web Development', 'Javascript'],
  },
  {
    title: 'Heroku',
    competency: 4,
    category: ['Web Development', 'Tools'],
  },
  {
    title: 'MongoDB',
    competency: 6,
    category: ['Web Development', 'Databases'],
  },
  {
    title: 'SQL',
    competency: 5,
    category: ['Databases'],
  },
  {
    title: 'Git',
    competency: 6,
    category: ['Tools'],
  },
  {
    title: 'Typescript',
    competency: 7,
    category: ['Web Development', 'Languages', 'Javascript'],
  },
  {
    title: 'HTML + CSS',
    competency: 7,
    category: ['Web Development', 'Languages'],
  },
  {
    title: 'Python',
    competency: 5,
    category: ['Languages'],
  },
].map((skill) => ({ ...skill, category: skill.category.sort() }));

// this is a list of colors that I like. The length should be == to the
// number of categories. Re-arrange this list until you find a pattern you like.
const colors = [
  '#6968b3',
  '#141415',
  // '#40D04F',
  '#034694', // chelsea blue
  '#FEC524', // nuggets yellow
  '#EE2737', // shu red ...sheffield united!
];

const categories = [
  ...new Set(skills.reduce((acc, { category }) => acc.concat(category), [])),
]
  .sort()
  .map((category) => ({
    name: category,
    color: colors[Math.floor(Math.random() * colors.length)],
    // color: colors[index],
  }));

export { categories, skills };
