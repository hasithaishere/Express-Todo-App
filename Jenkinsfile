pipeline {
  agent any
  stages {
    stage('error') {
      steps {
        sh '''git pull origin master
npm install
zip -r dist.zip ./
ls'''
      }
    }
  }
}