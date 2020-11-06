import * as db from 'firebase';

var firebaseConfig = {
apiKey: "AIzaSyBlo-SWYPJ9SV9k46HESwz73yLpcYYiHPc",
authDomain: "language-learner-29892.firebaseapp.com",
databaseURL: "https://language-learner-29892.firebaseio.com",
projectId: "language-learner-29892",
storageBucket: "language-learner-29892.appspot.com",
messagingSenderId: "721052127928",
appId: "1:721052127928:web:1fb64006e6b9db423c1a4d",
measurementId: "G-F7D6VBWMFK"
};
// Initialize Firebase
db.initializeApp(firebaseConfig);
db.analytics();

export default db;