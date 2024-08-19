## Description

Moodle Web Services (Core Api's) wrapper for nodejs. Written in TypeScript.

## Installation

```bash
$ npm i moodle-ws
```

## Environment/Setup
1. Create .env file in your root folder.
2. Add configuration and credentials

   ```bash
    MWS_URL=""
    MWS_USER=""
    MWS_PASS=""
    MWS_SERVICE=""
    ```
    Sample configuration
    ```bash
    MWS_URL="https://yourlms.com"
    MWS_USER="username"
    MWS_PASS="password"
    MWS_SERVICE="service"
    ```

## Usage
- Import via ES6 syntax


    ```typescript
        import { MoodleClient  } from 'moodle-ws';

        //call a new instance
        const mws = new MoodleClient();
    ```

- createUser Service (create an object that contains required params example below)


    ```typescript
        const user = {
            username: 'jlzcrn3',
            password: 'samplepass',
            firstname: 'Julz',
            lastname: 'Crn',
            email: 'jlzcrn3@gmail.com'
        }
        //expected return { "id": 1, "username": "jlzcrn3" }
        return await mws.createUser(user)
    ```

- getUser Service (will return specific user using (key, value))


    ```typescript
        //key = 'email'
        return await mws.getUser('jlzcrn3@gmail.com')
    ```

- updateUser Service (create an object that contains required params example below)


    ```typescript
        const user = {
            id: 1,
            username: 'jlzcrn3',
            password: 'newpassword',
            firstname: 'New Name',
            lastname: 'New Last Name',
            email: 'jlzcrn3@gmail.com'
        }
        //expected return { warnings: [] }
        //if warnings are empty means moodle udpate rules are satisfied and user succesfully updated
        return await updateUser(user)
    ```

- enrollUser Service


    ```typescript
        const enrollment = {
            roleid: 5, // Note: roleid depends on your moodle roles
            userid: 1, // pass the moodle Id of the user, This is the moodle user id in your app 
            courseid: 18, // pass the course id,
            suspend: 0
        }
        //expected return is 'enroll'
        return await mws.enrollUser(enrollment)
    ```

- unEnrollUser Service


    ```typescript
        const unenroll = {
            roleid: 5, // in our Moodle the value of 5 is student
            userid: 1, // pass the moodle Id of the user, This is the moodle user id in your app 
            courseid: 18 // pass the course id
        }
        //expected return is 'unenroll'
        return await mws.unEnrollUser(unenroll)
    ```

## Stay in touch

- Author - (prwsy) with (seav-devs)