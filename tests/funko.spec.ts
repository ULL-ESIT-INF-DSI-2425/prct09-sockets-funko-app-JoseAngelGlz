import { test, expect, describe, vi } from 'vitest'
import { Funko } from '../src/ejercicio-funkos/funko'

describe('Funko', () => {
  test('should create a new funko', () => {
    const funko = new Funko(
      1,
      'Funko1',
      'Funko1 description',
      'Pop!',
      'Animación',
      'The Big Bang Theory',
      1,
      false,
      'Special features',
      10
    )
    expect(funko.ID).toBe(1)
    expect(funko.name).toBe('Funko1')
    expect(funko.description).toBe('Funko1 description')
    expect(funko.type).toBe('Pop!')
    expect(funko.gender).toBe('Animación')
    expect(funko.franchise).toBe('The Big Bang Theory')
    expect(funko.pieceNumber).toBe(1)
    expect(funko.exclusive).toBe(false)
    expect(funko.specialFeatures).toBe('Special features')
    expect(funko.value).toBe(10)
  })
})