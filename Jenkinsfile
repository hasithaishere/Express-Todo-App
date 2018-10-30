pipeline {
  agent any
  stages {
    stage('error') {
      steps {
        sh '''git pull origin master
npm install
zip -r dist.zip ./
ls'''
        sh 'sudo ssh ubuntu@54.213.238.102 -i /home/hasitha/project/e25m/deployment/aws/keys/dev/dev_different.pem df -h'
      }
    }
  }
}