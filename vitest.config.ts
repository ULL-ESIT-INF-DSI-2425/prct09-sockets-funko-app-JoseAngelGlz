import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      include: ['src/ejercicio-funkos/funko.ts'],
      exclude: ['src/ejecicio-funkos/comands.ts', 'src/ejecicio-funkos/interfaces.ts', 'src/ejercicio-funkos/funkoManager.ts'],
    },
  },
});