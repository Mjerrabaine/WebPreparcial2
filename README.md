
# **WebPreparcial2**

## **Project Setup Commands**

### **TypeORM Setup**
```bash
npm install typeorm
npm install @nestjs/typeorm typeorm
```

### **Generate a Module**
```bash
nest g mo proyecto
```

### **Generate Entities**
```bash
nest g cl profesor/profesor.entity --no-spec
nest g cl estudiante/estudiante.entity --no-spec
```

### **Generate Services**
```bash
nest g s profesor
nest g s estudiante
```

### **Generate a Controller**
```bash
nest g co propuesta --no-spec
```

### **Generate an Interceptor**
```bash
nest g itc shared/interceptors/business-errors --no-spec
```

### **Generate a DTO**
```bash
nest g cl propuesta/propuesta.dto --no-spec
```

---

## **Install Additional Packages**

### **Validation and Transformation**
```bash
npm install class-validator class-transformer
npm install --save-dev @types/class-transformer @types/class-validator
```

### **Global Validation Setup**
To enable global validation, update your `main.ts`:
```typescript
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
```

---

## **Running the Project**
```bash
# Install dependencies
npm install

# Development
npm run start

# Watch mode
npm run start:dev

# Production
npm run start:prod
```

---

## **Test Commands**
```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```
