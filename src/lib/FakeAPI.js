const data = {
    activities: {
        '1546968934': {
        id: '1546968934',
        title: 'Learn Vue.js',
        notes: 'I started today and it was not good.',
        progress: 60,
        category: '1546969049',
        createdAt: 1546969144391,
        updatedAt: 1546969144391
        },
        '1546969212': {
        id: '1546969212',
        title: 'Read Witcher Books',
        notes: 'These books are super nice',
        progress: 40,
        category: '1546969049',
        createdAt: 1546969144391,
        updatedAt: 1546969144391
        }
    },
    categories: {
        '1546969049': {text: 'books', id: 1546969049},
        '1546969225': {text: 'movies', id: 1546969225}
    }
}



class FakeApi {
  canContinue () {
    return Math.floor(Math.random() * 10) > 0;
  }

  fillDB () {
    this.commitData(data);
  }

  commitData (data) {
    localStorage.setItem('activity_data', JSON.stringify(data));
  }

  getData () {
    const activityData = localStorage.getItem('activity_data');
    return JSON.parse(activityData);
  }
      
  get (resourse, {force = 0}) {
    return new Promise ((resolve, reject) => {
      const data = this.getData();
      setTimeout(() => {
        force || this.canContinue() ? resolve({...data[resourse]}) : reject('Cannot fetch '+ resourse);
      }, 1000)
    })
  }

  post (resource ,item) {
    return new Promise(resolve => {
      const data = JSON.parse(localStorage.getItem('activity_data'));
      data[resource][item.id] = item;
      localStorage.setItem('activity_data', JSON.stringify(data));
      resolve(item);
    })
  }

  delete (resource, item) {
    return new Promise(resolve => {
      const data = this.getData();
      delete data[resource][item.id];
      this.commitData(data);
      resolve(item);
    })
  }
}

export default new FakeApi(); 