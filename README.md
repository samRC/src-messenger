# src-messenger  ![GitHub Workflow Status](https://img.shields.io/github/workflow/status/samrc/src-messenger/E2E%20Tests?label=E2E%20Tests&style=for-the-badge) ![GitHub Workflow Status](https://img.shields.io/github/workflow/status/samRC/src-messenger/Deploy%20to%20Firebase%20Hosting%20on%20merge?label=BUILD%2FDEPLOY&style=for-the-badge)

### Live site: [https://src-messenger.web.app/](https://src-messenger.web.app/)

- Simple anonymous texting app
- Built using __ReactJS__ & __Firebase__
- End-to-end testing with __Cypress__
- CI/CD with __GitHub Actions__

## Start app
```bash
$ npm start
```
## Build app
```bash
$ npm run build
```
## Deploy to Firebase
```bash
$ npm run deploy:full
```

## Run E2E tests

Prerequisites:

- Set env var `REACT_APP_FIREBASE_TEST_CONFIG`
- Deploy security rules `npm run deploy:testEnv`

Run app in test environment from a separate terminal

```bash
$ npm run testEnv
# or
$ npm run build:testEnv
$ npm run start:testEnv
```

Run the tests

```bash
$ npm run cy:run
```

NB:

- The automated build & deploy does not include the deploying of firestore/storage rules
- Manually deploy Firestore/storage security rules for E2E test project via script
