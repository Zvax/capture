'use strict';

module.exports = function(Stuff) {
  Stuff.tree = function(cb) {
    let getChildren = id => {
      Stuff.find({"where": {"stuffId": id}}, (err, children) => {
        console.log('from find:', children);
        let newChildren = children.map(elem => {
          return Object.assign(
            {},
            elem['__data'],
            {children: getChildren(elem.id)}
          );
        });
        if (id === 0) {
          cb(null, newChildren);
        }
      });
    };
    getChildren(0);
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
