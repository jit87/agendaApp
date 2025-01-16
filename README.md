# AgendaApp

**AgendaApp** es una aplicación de gestión personal que permite a los usuarios organizar sus tareas y eventos de manera eficiente. Desarrollada con **Angular** para el frontend y **Firebase** para el backend, ofrece una interfaz intuitiva y funcionalidades en tiempo real para mejorar la productividad diaria.

---

### **Funcionalidades Principales**

- **Gestión de Tareas**: Permite crear, editar y eliminar tareas con facilidad.
- **Organización por Categorías**: Clasifica las tareas en diferentes categorías para una mejor organización.
- **Notificaciones en Tiempo Real**: Recibe alertas y recordatorios gracias a la integración con Firebase.
- **Sincronización Multidispositivo**: Accede a tus tareas desde cualquier dispositivo con sincronización en la nube.

---

### **Tecnologías Utilizadas**

- **Frontend**: Angular 12
- **Backend**: Firebase
- **Autenticación**: Firebase Authentication
- **Base de Datos**: Cloud Firestore

---

### **Estructura del Proyecto**

- `/src`: Contiene el código fuente de la aplicación Angular.
- `/src/app`: Incluye los componentes, servicios y módulos principales de la aplicación.
- `/src/environments`: Archivos de configuración para diferentes entornos (desarrollo y producción).

---

### **Instalación y Ejecución**

1. **Clonar el Repositorio**:
   ```bash
   git clone https://github.com/jit87/agendaApp.git
   ```

2. **Instalar Dependencias**:
   ```bash
   cd agendaApp
   npm install
   ```

3. **Configurar Firebase**:
   - Crea un proyecto en [Firebase](https://firebase.google.com/).
   - Configura la autenticación y la base de datos Firestore.
   - Copia la configuración de Firebase y reemplaza los valores en el archivo `src/environments/environment.ts`.

4. **Ejecutar la Aplicación**:
   ```bash
   ng serve
   ```
   - Accede a la aplicación en `http://localhost:4200/`.
