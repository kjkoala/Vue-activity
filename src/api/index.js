var activities = {
  '1546968934': {
    id: '1546968934',
    title: 'Learn Vue.js',
    notes: 'I started today and it was not good.',
    progress: 0,
    category: '1546969049',
    createdAt: 1546969144391,
    updatedAt: 1546969144391
  },
  '1546969212': {
    id: '1546969212',
    title: 'Read Witcher Books',
    notes: 'These books are super nice',
    progress: 0,
    category: '1546969049',
    createdAt: 1546969144391,
    updatedAt: 1546969144391
  }
}

const canContinue = () => {
  return Math.floor(Math.random() * 10) > 5;

}

export const fetchActivities = () => {
  return new Promise ((resolve, reject) => {
    setTimeout(() => {
      canContinue() ? resolve(activities) : reject('Server has error');
    }, 2000)
  })
}

export const fetchCategories = () => {
    return {
        '1546969049': {text: 'books'},
        '1546969225': {text: 'movies'}
      }
}

export const fetchUser = () => {
    return {
        name: 'Filip Jerga',
        id: '-Aj34jknvncx98812',
      }
}

const generateUid = () => Math.floor(new Date() * Math.random())

export function createActivity (activity) {

  activity.id = generateUid();
  activity.progress = 0;
  activity.createdAt = new Date();
  activity.updatedAt = new Date();

  return new Promise(resolve => {
    resolve(activity);
  })
  
}