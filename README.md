# @myfarms/mf-mask

Playground: <https://stackblitz.com/edit/mf-mask>

## Getting started

### Step 1: Install `@myfarms/mf-mask`

```bash
$ npm install @myfarms/mf-mask --save
```

### Step 2: Import the MfSelectModule

```typescript
import { NgModule } from '@angular/core';

import { MfMaskModule } from '@myfarms/mf-mask';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    MfMaskModule.forRoot(),
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
```

### Step3: Use the component in your template

```xml
<input type='text' mfMask='(999) 999-9999' [(ngModel)]='model' />
```

## API
### Inputs

| Input  | Type | Default | Description |
| ------------- | ------------- | ------------- | ------------- |
| mfMask | `string` | `""` | The input mask |

### Options
You can pass in configuration options into the modules `forRoot` method.
```typescript
    /* Types and defaults */
    interface IPatterns {
      [pattern: string]: RegExp;
    }

    interface IMasks {
      [name: string]: string;
    }

    interface IConfig {
      patterns: IPatterns;
      preparedMasks: IMasks;
    }

    const initialConfig: IConfig = {
      patterns: {
        a: new RegExp(/[a-z]/),
        A: new RegExp(/[A-Z]/),
        Z: new RegExp(/[a-zA-Z]/),
        9: new RegExp(/[0-9]/)
      },
      preparedMasks: {
        PHONE: "(999) 999-9999"
      }
    };

    /* In your module */
    MfMaskModule.forRoot({
        patterns: {
            N: new RegExp(/[a-zA-Z0-9/),
        },
        preparedMasks: {
            PHONE: '999 999 9999',
            CODE: 'NNNNN',
        },
    })
```

## Development

To generate all `*.js`, `*.d.ts` and `*.metadata.json` files:

```bash
$ npm run build
```

To lint all `*.ts` files:

```bash
$ npm run lint
```

## License

MIT © [Adam Keenan](mailto:adam.keenan@myfarms.com)
