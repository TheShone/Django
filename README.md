![alt text](https://i0.wp.com/blog.knoldus.com/wp-content/uploads/2020/06/python-django.png?fit=2400%2C800&ssl=1)

# Django Tutorial i integracija sa React projektom

## Opis problema

Ovaj projekat predstavlja To-Do aplikaciju implementiranu pomoću Django-a kao backend-a i React-a kao frontend-a.
Prikazuju se osnovne karakteristike Django frameworka kao i način integracije sa React frontend frameworkom.
Projekat omogućava korisnicima da kreiraju, ažuriraju i brišu zadatke uz autentifikaciju i autorizaciju putem JWT-a.

---

## Sadržaj

1. [Tehnologije](#tehnologije)
2. [Šta je Django?](#šta-je-django)
3. [Kreiranje i Struktura Django Projekta](#kreiranje-i-struktura-django-projekta)
4. [Kreiranje Aplikacije](#kreiranje-aplikacije)
5. [Django ORM i Podržane Baze Podataka](#django-orm-i-podržane-baze-podataka)
6. [Autentifikacija i Autorizacija](#autentifikacija-i-autorizacija)
7. [CRUD Operacije u Djangu](#crud-operacije-u-djangu)
8. [Integracija sa React-om](#integracija-sa-react-om)
9. [Korišćenje i Pokretanje Projekta](#korišćenje-i-pokretanje-projekta)

---

## Tehnologije

- [Django](https://www.djangoproject.com/)
- [MySQL](https://www.mysql.com/)
- [React](https://react.dev/)
- [Vite](https://vite.dev/)
- [Tailwind Css](https://tailwindcss.com/)
- [JWT](https://jwt.io/)

---

## Šta je Django?

Django je Python framework za razvoj web aplikacija koji se fokusira na brzinu razvoja, sigurnost i skalabilnost. Baziran je na MVT arhitekturi i krasi ga buttery-included pristup.
Nudi unapred pripremljen admin panel, ORM (Object-Relational Mapping), autentifikaciju i integraciju sa različitim bazama podataka.
"The web framework for perfectionists with deadlines."

### Ključne karakteristike Django-a:

- <b>Brzina razvoja:</b> Django omogućava brzi prelazak od koncepta do realizacije web aplikacija, zahvaljujući unapred pripremljenim komponentama i modularnoj strukturi.
- <b>Potpuno opremljen:</b> Dolazi sa integrisanim alatima za autentifikaciju korisnika, administraciju sadržaja, generisanje mapa sajta, RSS feedova i mnogim drugim funkcionalnostima.
- <b>Sigurnost:</b> Pruža zaštitu od uobičajenih sigurnosnih pretnji kao što su SQL injekcije, cross-site scripting (XSS), cross-site request forgery (CSRF) i clickjacking.
- <b>Skalabilnost:</b> Dizajniran da podnese visoke saobraćajne zahteve, što ga čini pogodnim za velike i zahtevne projekte.
- <b>Svestranost:</b> Koristi se za izradu različitih tipova aplikacija, od sistema za upravljanje sadržajem do društvenih mreža i naučnih platformi.
- <b>ORM (Object-Relational Mapper):</b> Omogućava interakciju sa bazama podataka putem Python koda, bez potrebe za pisanjem SQL upita.
- <b>MTV arhitektura:</b> Prati Model-Template-View obrazac koji podstiče čistu separaciju poslovne logike, podataka i prezentacionog sloja.
- <b>Aktivna zajednica:</b> Velika i aktivna zajednica doprinosi stalnom razvoju, poboljšanjima i dostupnosti brojnih resursa i dodataka.

---

## Kreiranje i struktura Django projekta

- Pre kreiranja Django projekta neophodno je posedovati insatiran python, koji se može instalirati sa oficijalnog sajta pythona (https://www.python.org/downloads/)
- Prilikom instalacije čekirati Add Python to PATH
- Kreiranje direktorijuma u kom će se nalaziti projekat komandom:

```bash
mkdir nazivDirektorijuma
```

i poziciniranje u direktorijum komandom:

```bash
cd nazivDirektorijuma
```

- Kreiranje virtuelne okoline komandom:

```bash
python –m venv env
```

- Aktiviranje virtuelne okoline komandom:

```bash
.\env\Scripts\activate
```

- Instalacija Djanga komandom:

```bash
pip install Django
```

- Kreiranje Django projekta komandom:

```bash
django-admin startproject myproject
```

- Pozicioniranje u folder komandom:

```bash
cd myproject
```

- Pokretanje projekta komandom:

```bash
python manage.py runserver
```

### Struktura projekta:

```bash
myproject/
│
├── manage.py
├── myproject/
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   ├── asgi.py
│   └── wsgi.py
└── db.sqlite3
```

- manage.py – Skripta za upravljanje projektom (migracije, kreiranje korisnika, pokretanje servera).
- myproject/ - Sadrži glavne konfiguracione fajlove projekta

  - **init**.py - Ovaj fajl označava direktorijum kao Python modul.
  - setting.py - Glavni konfiguracioni fajl projekta (podešavanje baze podataka, aplikacija, CORS, JWT itd.).
  - urls.py - Definisanje ruta URL-ova koji upućuju na određene view funkcije.
  - asgi.py - Koristi se za asinhroni interfejs servera.
  - wsgi.py - Web Server Gateway Interface, omogućava povezivanje sa web serverima (npr. Gunicorn).

- db.sqlite3 - Podrazumevana baza podataka (SQLite).

---

## Kreiranje aplikacije

Django aplikacija je modularni deo projekta koji obavlja određenu funkcije(autentifikacija, blog, korpa). Projekat može imati više aplikacija koje rade zajedno

- Kreiranje aplikacije postiže se komandom:

```bash
 python manage.py startapp api
```

- Registracija kreirane aplikacije u seeting.py:

```bash
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'api',
    'rest_framework',
    'corsheaders',
]
```

- Struktura aplikacije:

```bash
api/
│
├──migrations/
├── __init__.py
├── admin.py
├── apps.py
├── models.py
├── tests.py
└── views.py
```

- migrations/ - Praćenje izmena u modelima (migracije)
- **init**.py - Ovaj fajl označava direktorijum kao Python modul.
- admin.py – Registracija modela za admin panel
- apps.py – Konfiguracija aplikacija
- models.py – Definicija modela koji predstavljaju tabele u bazi podataka.
- tests.py - Testiranje aplikacija
- views.py - Prikazi I logika aplikacije

---

## Django ORM i podržane baze podataka

Django ORM omogućava rad sa bazom podataka kroz Python kod.

#### Podržane baze podataka uključuju:

- SQLite (podrazumevana)
- PostgreSQL
- MySQL
- Oracle
- MariaDB

#### Povezivanje sa MySQL bazom podataka

- Potrebno je instalirati MySQL komdandom:

```bash
pip install mysqlclient
```

- Konfiguracija u settings.py fajlu:

```bash
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'toDo',
        'USER': 'root',
        'PASSWORD': 'password',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}
```

#### Primer modela u Django-u:

```bash
from django.db import models
from django.contrib.auth.models import AbstractUser
class Task(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    status = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

```

Kreiranje migracija i njihovo apliciranje komandama:

```bash
python manage.py makemigrations
python manage.py migrate
```

### Admin panel

Kreiranje superusera(admina) komandom:

```bash
python manage.py createsuperuser
```

Kako bi administrator mogao da upravlja podacima, potrebno je registrovati sve klase modela u fajlu admin.py. Na taj način, podaci postaju dostupni za administraciju kroz Django admin panel.

```bash
from django.contrib import admin
from .models import Task,User,CommonUser
admin.site.register(Task)
admin.site.register(User)
admin.site.register(CommonUser)
```

---

## Autentifikacija i Autorizacija

U ovom projektu koristi se JWT autentifikacija pomoću Simple JWT biblioteke. Za autentifikaciju se u CRUD operacijama koristi permisija IsAuthenticated, a za autorizaciju se koristi request.self da bi se obezbedila modifikacija samo svojih podataka.

- Instalacija potrebnih biblioteka:

```bash
pip install djangorestframework
pip install djangorestframework-simplejwt
```

- Konfiguracija u settings.py:

```bash
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=30),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
}

```

---

## CRUD operacije u Djangu

CRUD operacije su implementirane koristeći Django generičke klase:

```bash
#task serializer
class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields=["id", "title", "description", "status", "created_at", "user"]
        extra_kwargs = {"user": {"read_only": True}}

#task view
#Tasks Crud operations

#Put Tasks and Get Tasks per User
class TaskListCreate(generics.ListCreateAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        print(user)
        return Task.objects.filter(user=user)

    def perform_create(self,serializer):
        print(self)
        print(serializer)
        if serializer.is_valid():
            serializer.save(user=self.request.user)
        else:
            print(serializer.errors)

#Get task per ID
class GetTask(generics.RetrieveAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        user=self.request.user
        return Task.objects.filter(user=user)

#Delete Task
class TaskDelete(generics.DestroyAPIView):
    serializer_class = TaskSerializer
    permission_classes=[IsAuthenticated]
    def get_queryset(self):
        user = self.request.user
        return Task.objects.filter(user=user)
#Put Task
class PutTask(generics.UpdateAPIView):
    serializer_class = TaskSerializer
    permission_classes=[IsAuthenticated]
    def get_queryset(self):
        user = self.request.user
        return Task.objects.filter(user=user)

```

- TaskSerializer je odgovoran za pretvaranje Task modela u JSON format koji API vraća korisniku, kao i za validaciju podataka prilikom kreiranja ili ažuriranja zadatka.

- Meta klasa određuje koji model (Task) se serijalizuje i koje atribute uključujemo u API odgovore/zahteve (id, title, description, status, created_at, user).
  Polje user je read_only, što znači da se ne može eksplicitno postaviti prilikom kreiranja ili ažuriranja zadatka – korisnik se automatski dodeljuje putem perform_create metode u TaskListCreate klasi.
- Serijalizer : Pretvara Django model (Task) u JSON koji frontend može koristiti.Osigurava da su podaci ispravni pre nego što se sačuvaju u bazu.Automatizuje rad sa poljima kao što su created_at i user, čime se smanjuje potreba za dodatnim kodom u API pogledima.
- Klasa GetTask koristi RetrieveAPIView, omogućavajući dohvatanje zadatka po ID-u (GET na /tasks/{id}/).
  Zadatak se filtrira po korisniku kako bi se sprečilo da korisnici pristupaju zadacima drugih korisnika
- Klasa PutTask koristi UpdateAPIView koja omogućava ažuriranje postojećih zadataka (PUT ili PATCH).
  Korisnici mogu menjati samo svoje zadatke zahvaljujući filtriranju u get_queryset metodi.
- Klasa TaskDelete koristi DestroyAPIView za brisanje zadataka.
  Pristup je ograničen tako da korisnik može obrisati samo svoje zadatke.

## Integracija sa React-om

- React je JavaScript biblioteka za izgradnju korisničkih interfejsa (UI), poznata po brzini, fleksibilnosti i mogućnosti pravljenja interaktivnih web aplikacija kroz komponente.

#### Kreiranje React projekta:

- Instalacija Node.js sa oficijalnog sajta: https://nodejs.org/en

- Kreiranje direktrorijuma u kome će se nalaziti projekat naredbom:

```bash
mkdir frontend
```

- Pozicioniranje u odgovarajući direktorijum komandom:

```bash
 cd frontend
```

- Korišćenjem Vite-a kreiranje React projekta se obavlja: naredbom:

```bash
    npm create vite@latest api -- --template react
```

Pozicioniranje u react projekat komandom:

```bash
 cd api
```

Instalacija neophodnih zavisnosti komandom:

```bash
 npm install
```

#### Konfiguracija CORS-a na Django backendu

- CORS (Cross-Origin Resource Sharing) omogućava frontend aplikaciji (React) da šalje zahteve ka backend serveru (Django) koji se nalazi na drugoj domeni ili portu.
- Koraci u konfiguraciji CORS-a:
  - Instalacija django-cors-headers paketa komandom:
  ```bash
  pip install django-cors-headers
  ```
  - Dodavanje corsheadersa u INSTALLED_АPPS u settings.py:
  ```bash
  INSTALLED_APPS = [
  'django.contrib.admin',
  'django.contrib.auth',
  'django.contrib.contenttypes',
  'django.contrib.sessions',
  'django.contrib.messages',
  'django.contrib.staticfiles',
  'api',
  'rest_framework',
  'corsheaders',
  ]
  ```
  - Dodavanje middleware-a za CORS u settings.py:
  ```bash
  MIDDLEWARE = [
  "corsheaders.middleware.CorsMiddleware",
  'django.middleware.security.SecurityMiddleware',
  'django.contrib.sessions.middleware.SessionMiddleware',
  'django.middleware.common.CommonMiddleware',
  'django.middleware.csrf.CsrfViewMiddleware',
  'django.contrib.auth.middleware.AuthenticationMiddleware',
  'django.contrib.messages.middleware.MessageMiddleware',
  'django.middleware.clickjacking.XFrameOptionsMiddleware',
  ]
  ```
  - Omogućavanje pristup specifičnim domenima u settings.py:
  ```bash
  CORS_ALLOWED_ORIGINS = [
  "https://localhost:5173",
  "https://127.0.0.1:5173",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  ]
  ```

#### Setupovanje Axios Interceptora za automatsko dodavanje tokena u React-u:

```bash
import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

```

## Korišćenje i pokretanje projekta

- Kloniranje repozitorijuma komdandama:

```bash
mkdir django
git clone https://github.com/TheShone/Django.git
cd Django
```

- Instalacija i pokretanje Django backenda:

```bash
python -m venv env
.\env\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

- Pokretanje React frontenda:

```bash
cd frontend
npm install
npm run dev
```

#### Korišćenje

1. Prijava korisnika (Login):
   React frontend šalje POST zahtev na /api/token/ kako bi dobio access i refresh token.
2. Pregled zadataka:
   GET zahtev na /api/tasks/ prikazuje sve zadatke korisnika.
3. Kreiranje zadatka:
   POST zahtev na /api/tasks/.
4. Ažuriranje i brisanje:
   PUT i DELETE zahtevi na /api/tasks/{id}/.
