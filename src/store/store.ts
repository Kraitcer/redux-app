// Импортируйте compose из Redux
import { createStore, combineReducers } from "redux";
import { projectsReducer } from "./projectsReducer";
import { tasksReducer } from "./tasksReducer";
import { subTasksReducer } from "./subTasksReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// import rootReducer from './reducers'

const persistConfig = {
  key: "root",
  storage,
};

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof import("redux").compose;
  }
}
// Корневой редьюсер, если у вас больше одного редьюсера
const rootReducer = combineReducers({
  projects: projectsReducer,
  tasks: tasksReducer,
  subTasks: subTasksReducer,
  // другие редьюсеры могут быть добавлены сюда
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
// Подключение к расширению Redux DevTools
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Создание Redux store с поддержкой Redux DevTools
const store = createStore(persistedReducer);
// const store = createStore(rootReducer, composeEnhancers());
export let persistor = persistStore(store);
export default store;
