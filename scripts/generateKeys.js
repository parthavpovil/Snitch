const NodeRSA = require('node-rsa');
const fs = require('fs');

const generateKeyPair = () => {
  const key = new NodeRSA({b: 2048});
  
  const publicKey = key.exportKey('public');
  const privateKey = key.exportKey('private');

  // Save keys to files
  fs.writeFileSync('public-key.pem', publicKey);
  fs.writeFileSync('private-key.pem', privateKey);

  console.log('Key pair generated successfully!');
  console.log('\nPublic Key (for user interface):\n', publicKey);
  console.log('\nPrivate Key (for admin panel ONLY):\n', privateKey);
};

generateKeyPair(); 