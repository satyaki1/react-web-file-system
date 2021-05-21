const fileSystem = {
  '0': {
    type: 'FOLDER',
    name: 'root',
    path: '/',
    size: 0,
    date: '2021-05-21',
    creatorName: 'System',
    parentPath: null,
    parentID: null,
    children: [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6'
    ]
  },
  '1': {
    type: 'FOLDER',
    name: 'apps',
    creatorName: 'Satyaki',
    size: 223,
    date: '2021-05-21',
    parentID: '0',
    parentPath: '/',
    path: '/apps',
    children: []
  },
  '2': {
    type: 'FOLDER',
    name: 'pictures',
    creatorName: 'Satyaki',
    size: 23,
    date: '2021-05-21',
    parentID: '0',
    parentPath: '/',
    path: '/pictures',
    children: []
  },
  '3': {
    type: 'FOLDER',
    name: 'videos',
    creatorName: 'Satyaki',
    size: 0,
    date: '2021-05-21',
    parentID: '0',
    parentPath: '/',
    path: '/videos',
    children: []
  },
  '4': {
    type: 'FOLDER',
    name: 'docs',
    creatorName: 'Satyaki',
    size: 233,
    date: '2021-05-21',
    parentID: '0',
    parentPath: '/',
    path: '/docs',
    children: [
      '7',
      '8',
      '9'
    ]
  },
  '5': {
    type: 'FILE',
    name: 'a.pdf',
    creatorName: 'Satyaki',
    size: 234,
    date: '2021-05-21',
    parentID: '0',
    parentPath: '/',
    path: '/a.pdf'
  },
  '6': {
    type: 'FILE',
    name: 'b.jpg',
    creatorName: 'Satyaki',
    size: 234,
    date: '2021-05-21',
    parentID: '0',
    parentPath: '/',
    path: '/b.jpg'
  },
  '7': {
    type: 'FOLDER',
    name: 'work',
    creatorName: 'Satyaki',
    size: 200,
    date: '2021-05-21',
    parentID: '4',
    parentPath: '/docs',
    path: '/docs/work',
    children: [
      '10',
      '11'
    ]
  },
  '8': {
    type: 'FILE',
    name: 'c.pdf',
    creatorName: 'Satyaki',
    size: 200,
    date: '2021-05-21',
    parentID: '4',
    parentPath: '/docs',
    path: '/docs/c.pdf'
  },
  '9': {
    type: 'FILE',
    name: 'd.docx',
    creatorName: 'Satyaki',
    size: 235,
    date: '2021-05-21',
    parentID: '4',
    parentPath: '/docs',
    path: '/docs/d.docx'
  },
  '10': {
    type: 'FILE',
    name: 'e.pdf',
    creatorName: 'Satyaki',
    size: 0,
    date: '2021-05-21',
    parentID: '7',
    parentPath: '/docs/work',
    path: '/docs/work/e.pdf'
  },
  '11': {
    type: 'FILE',
    name: 'f.ts',
    creatorName: 'Satyaki',
    size: 235,
    date: '2021-05-21',
    parentID: '7',
    parentPath: '/docs/work',
    path: '/docs/work/f.ts'
  }
};

const generateFileSystem = () => {
  localStorage.setItem('fileSystem', JSON.stringify(fileSystem));
  return fileSystem;
};

export default generateFileSystem;
