# Playwright E2E Test Framework

Mixcurb.com için Playwright tabanlı end-to-end test framework'ü.

## Özellikler

- Page Object Model (POM) mimarisi
- Allure raporlama entegrasyonu
- GitHub Actions CI/CD pipeline
- Multi-browser desteği (Chromium, Firefox, WebKit)
- GitHub Pages'da otomatik rapor yayınlama

## Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Playwright tarayıcılarını yükle
npx playwright install
```

## Lokal Ortamda Test Koşma

### Tüm Testleri Koş

```bash
# Tüm testler, varsayılan tarayıcı (Chromium)
npx playwright test

# Tüm testler, belirli tarayıcı
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Tüm testler, tüm tarayıcılar
npx playwright test --project=chromium --project=firefox --project=webkit
```

### Belirli Test Suite Koş

```bash
# Smoke testleri
npx playwright test tests/smoke

# Login testleri
npx playwright test tests/auth/login.spec.ts

# Logout testleri
npx playwright test tests/auth/logout.spec.ts
```

### Belirli Bir Testi Koş

```bash
# Test adına göre filtrele
npx playwright test -g "should login with valid credentials"

# Belirli dosya ve test
npx playwright test tests/auth/login.spec.ts -g "should display"
```

### Debug Modu

```bash
# UI modunda çalıştır (tarayıcı görünür)
npx playwright test --headed

# Debug modunda çalıştır
npx playwright test --debug

# Playwright Inspector ile
npx playwright test --ui
```

### Rapor Görüntüleme

```bash
# HTML raporu oluştur ve aç
npx playwright show-report

# Allure raporu oluştur
npx allure generate allure-results -o allure-report --clean
npx allure open allure-report
```

## GitHub Actions'da Test Koşma

### Otomatik Tetikleme

Testler şu durumlarda otomatik çalışır:
- `main` veya `master` branch'ine push
- Pull request açıldığında

### Manuel Tetikleme

1. [Actions](../../actions) sayfasına git
2. **"Playwright Tests"** workflow'unu seç
3. **"Run workflow"** butonuna tıkla
4. Seçenekleri belirle:

| Seçenek | Değerler | Açıklama |
|---------|----------|----------|
| **Test suite** | `all`, `smoke`, `login`, `logout` | Hangi test grubunun koşulacağı |
| **Browser** | `all`, `chromium`, `firefox`, `webkit` | Hangi tarayıcıda koşulacağı |

### Örnek Kombinasyonlar

| Senaryo | Test Suite | Browser |
|---------|------------|---------|
| Hızlı doğrulama | `smoke` | `chromium` |
| Login akışı testi | `login` | `all` |
| Tam regresyon | `all` | `all` |
| Safari uyumluluk | `all` | `webkit` |

## Proje Yapısı

```
playwright-e2e/
├── .github/
│   └── workflows/
│       └── playwright.yml    # CI/CD pipeline
├── src/
│   ├── config/
│   │   └── env.config.ts     # Ortam değişkenleri
│   ├── fixtures/
│   │   ├── base.fixture.ts   # Temel fixture'lar
│   │   └── auth.fixture.ts   # Authentication fixture
│   ├── pages/
│   │   ├── base.page.ts      # Base page class
│   │   ├── login.page.ts     # Login sayfası
│   │   └── components/
│   │       └── header.component.ts
│   └── data/
│       ├── test-data.ts      # Test data factory
│       └── users.data.ts     # Kullanıcı verileri
├── tests/
│   ├── auth/
│   │   ├── login.spec.ts     # Login testleri
│   │   └── logout.spec.ts    # Logout testleri
│   └── smoke/
│       └── smoke.spec.ts     # Smoke testleri
├── .env.test                  # Lokal ortam değişkenleri (gitignore'da)
├── playwright.config.ts       # Playwright konfigürasyonu
└── package.json
```

## Ortam Değişkenleri

Lokal test için `.env.test` dosyası oluştur:

```env
BASE_URL=https://mixcurb.com
API_URL=https://mixcurb.com
USER_EMAIL=your-email@example.com
USER_PASSWORD=your-password
```

> **Not:** `.env.test` dosyası `.gitignore`'da olduğundan GitHub'a gönderilmez.

GitHub Actions için **Repository Secrets** kullanılır:
- `USER_EMAIL`
- `USER_PASSWORD`

## Raporlar

### Allure Report (GitHub Pages)

Test sonuçları otomatik olarak GitHub Pages'da yayınlanır:

**URL:** `https://<username>.github.io/playwright-e2e/`

### Artifacts

Her workflow çalışmasında şu artifact'lar oluşturulur:
- `allure-results-chromium`
- `allure-results-firefox`
- `allure-results-webkit`
- `allure-report`

## Yeni Test Ekleme

### 1. Page Object Oluştur

```typescript
// src/pages/example.page.ts
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class ExamplePage extends BasePage {
  readonly url = '/example';

  private readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);
    this.submitButton = this.getByRole('button', { name: 'Submit' });
  }

  async clickSubmit(): Promise<void> {
    await this.submitButton.click();
  }
}
```

### 2. Fixture'a Ekle

```typescript
// src/fixtures/base.fixture.ts
import { ExamplePage } from '../pages/example.page';

type Pages = {
  // ... mevcut page'ler
  examplePage: ExamplePage;
};

export const test = base.extend<Pages>({
  // ... mevcut fixture'lar
  examplePage: async ({ page }, use) => {
    await use(new ExamplePage(page));
  },
});
```

### 3. Test Yaz

```typescript
// tests/example/example.spec.ts
import { test, expect } from '../../src/fixtures/base.fixture';
import * as allure from 'allure-js-commons';

test.describe('Example Tests', () => {
  test('should do something', async ({ examplePage }) => {
    allure.epic('Example');
    allure.feature('Example Feature');
    allure.severity('normal');

    await examplePage.navigate();
    await examplePage.clickSubmit();

    // assertions...
  });
});
```

## Faydalı Komutlar

```bash
# Testleri izleme modunda çalıştır (dosya değişikliklerinde yeniden koş)
npx playwright test --watch

# Sadece başarısız testleri tekrar koş
npx playwright test --last-failed

# Belirli sayıda worker ile koş
npx playwright test --workers=4

# Trace ile koş (hata ayıklama için)
npx playwright test --trace on
```

## Lisans

MIT
