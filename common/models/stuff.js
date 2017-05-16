'use strict';

module.exports = function(Stuff) {
  Stuff.tree = function(cb) {
    let processor = elem => {
      return new Promise(async resolve => {
        console.log('processing elem ', elem);
        let newElem = Object.assign(
          {},
          elem['__data'],
          {children: await getChildren(elem.id)}
        );
        resolve(newElem);
      });
    };
    let getChildren = id => {
      return new Promise(resolve => {
        console.log('in promise with stuffId', id);
        Stuff.find({"where": {"stuffId": id}}, async (err, children) => {
          if (err) {
            console.log(err) ;
          }
          console.log('children of stuffId', id, 'are', children);
          let newChildren = [];
          for (let child of children) {
            let thisChild = await processor(child);
            newChildren.push(thisChild);
          }
          console.log('mapped elems for id', id, 'are', newChildren);
          resolve(newChildren);
        });
      });
    };
    getChildren(0).then(res => {
      console.log('in original getChildren resolution', res);
      cb(null, res);
    }, err => console.log('in then handler',err)).catch(err => console.log('problem', err));
  };
  Stuff.remoteMethod(
    'tree',
    {
      http: {
        path: '/tree',
        verb: 'get'
      },
      returns: {
        type: 'array',
        root: true
      }
    }
  );
};
