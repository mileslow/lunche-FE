import Routes from 'navigation/routes'

export type ExampleNavigationStackParamsList = {
  [Routes.ExampleStackIndex]: undefined
  [Routes.ExampleStackChild]: {
    payload: string
  }
}
