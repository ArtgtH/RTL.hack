import { configureStore, createAction, createReducer } from '@reduxjs/toolkit';

// Создание действия для обновления данных
const setUserData = createAction('user/setUserData');

// Начальное состояние
const initialState = {
  user: null
};

// Создание редюсера
const userReducer = createReducer(initialState, (builder) => {
  builder.addCase(setUserData, (state, action) => {
    state.user = action.payload;  // Сохраняем данные, которые пришли в action.payload
  });
});

// Конфигурация store
const store = configureStore({
  reducer: {
    user: userReducer
  }
});

// Экспортируем действия и store
export { setUserData, store };
