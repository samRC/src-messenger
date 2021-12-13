# src-messenger

## WORK of this branch is shifted to `ci-e2e-testing` branch

## DO NOT merge this branch

![GitHub Workflow Status](https://img.shields.io/github/workflow/status/samRC/src-messenger/Deploy%20to%20Firebase%20Hosting%20on%20merge?label=BUILD%2FDEPLOY&style=for-the-badge)

## Run E2E tests

Prerequisites:

- Set env var `REACT_APP_FIREBASE_TEST_CONFIG`
- Deploy security rules `npm run deploy:testEnv`

Run app in test environment from a separate terminal

```bash
npm run testEnv
```

Run the tests

```bash
npm run cy:run
```

NB:

- The automated build & deploy does not include the deploying of firestore/storage rules
- Manually deploy Firestore/storage security rules for E2E test project via script
