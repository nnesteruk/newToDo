// hooks/hooks.ts
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch } from 'react-redux';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: string | null;
}>();
