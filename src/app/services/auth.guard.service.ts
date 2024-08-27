import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (authService.isAuthenticated()) {
    return true;
  }
  return router.parseUrl('/login');
};