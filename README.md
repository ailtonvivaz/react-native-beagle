<p align="center">
  <img src="./doc/images/logo.png" alt="logo" width="15%"/>
</p>

<h1 align="center">
  Beagle
</h1>

Beagle is an in-app tool for React Native that helps QA sniff logs, network activity, and errors, with support for custom plugins.

## Installation

```sh
npm install react-native-beagle
```

## Usage

1. First, you need to wrap your app with the `BeagleProvider` component. This component will provide the context for the Beagle tool to work.

```ts
import { BeagleProvider } from 'react-native-beagle';

const App = () => {
  return (
    <BeagleProvider>
      // Your app code
    </BeagleProvider>
  );
};

export default App;
```

2. Then, you can use the `useBeagle` hook to access the Beagle tool.

```ts
import { useBeagle } from 'react-native-beagle';

const MyComponent = () => {
  const { showInspector } = useBeagle();

  return (
    <Button onPress={() => useBeagle()} title="Open Beagle" />
  );
};
```


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
