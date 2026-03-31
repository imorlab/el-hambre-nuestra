import { defineConfig, loadEnv } from 'vite';
import { copyFileSync, mkdirSync, existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const base = '/el-hambre-nuestra/';
  
  return {
    base,
    build: {
      copyPublicDir: true,
    },
    plugins: [
      {
        name: 'transform-env-vars',
        closeBundle() {
          const jsDir = join(__dirname, 'dist/js');
          if (!existsSync(jsDir)) {
            mkdirSync(jsDir, { recursive: true });
          }
          
          const envVars = {
            VITE_SUPABASE_URL: env.VITE_SUPABASE_URL || '',
            VITE_SUPABASE_ANON_KEY: env.VITE_SUPABASE_ANON_KEY || '',
          };
          
          ['config.js', 'db.js', 'auth.js', 'app.js'].forEach(file => {
            const srcPath = join(__dirname, 'js', file);
            const destPath = join(jsDir, file);
            let content = readFileSync(srcPath, 'utf-8');
            
            content = content.replace(
              /window\.ENV\?\.VITE_SUPABASE_URL/g,
              JSON.stringify(envVars.VITE_SUPABASE_URL)
            );
            content = content.replace(
              /window\.ENV\?\.VITE_SUPABASE_ANON_KEY/g,
              JSON.stringify(envVars.VITE_SUPABASE_ANON_KEY)
            );
            
            writeFileSync(destPath, content);
          });

          const indexPath = join(__dirname, 'dist/index.html');
          if (existsSync(indexPath)) {
            let html = readFileSync(indexPath, 'utf-8');
            html = html.replace(/src="js\//g, `src="${base}js/`);
            html = html.replace(/href="css\//g, `href="${base}css/`);
            writeFileSync(indexPath, html);
          }
        },
      },
    ],
  };
});