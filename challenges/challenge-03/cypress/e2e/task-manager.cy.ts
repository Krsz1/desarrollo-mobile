describe('Task Manager App', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display the app title', () => {
    cy.contains('Administrador de Tareas').should('be.visible')
  })

  it('should display empty state when no tasks exist', () => {
    // Clear localStorage
    cy.clearLocalStorage()
    cy.reload()
    cy.contains('No hay tareas aún').should('be.visible')
  })

  it('should add a new task', () => {
    cy.contains('Añadir Nueva Tarea').click()
    cy.get('input[placeholder="Escribe el título de la tarea"]').type('Test Task')
    cy.get('input[placeholder="Añade una descripción (opcional)"]').type('Test Description')
    cy.contains('Añadir Tarea').click()
    cy.contains('Test Task').should('be.visible')
  })

  it('should mark task as completed', () => {
    cy.contains('Tareas Pendientes').should('be.visible')
    cy.get('ion-checkbox').first().click()
    cy.contains('Tareas Completadas').should('be.visible')
  })

  it('should delete a task', () => {
    cy.get('[title="Eliminar tarea"]').first().click()
    cy.contains('Tarea eliminada').should('be.visible')
  })
})
