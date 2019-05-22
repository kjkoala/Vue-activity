import FakeApi from '@/lib/FakeAPI'


export const fetchActivities = () => {
  return FakeApi.get('activities', {force: 1});
}

export const fetchCategories = () => {
  return FakeApi.get('categories', {force: 1});
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

  return new FakeApi.post('activities',activity);
}


export const deleteActivityAPI = activity => {
  return FakeApi.delete('activities', activity)
}