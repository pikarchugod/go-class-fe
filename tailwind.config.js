import tailwindcssAnimate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: [
	  "./index.html",
	  "./src/**/*.{js,ts,jsx,tsx}"
	],
	theme: {
    	extend: {
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
			},
    		container: {
    			center: true,
    			padding: {
    				DEFAULT: '1.5rem',
    				sm: '1.5rem',
    				lg: '5rem',
    				xl: '5rem'
    			},
    			screens: {
    				sm: '100%',
    				md: '100%',
    				lg: '1200px',
    				xl: '1280px'
    			}
    		},
    		spacing: {
    			sm: '8px',
    			DEFAULT: '16px',
    			lg: '32px'
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		colors: {
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			primary: {
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			success: {
    				DEFAULT: 'hsl(var(--success))'
    			},
    			warning: {
    				DEFAULT: 'hsl(var(--warning))'
    			},
    			error: {
    				DEFAULT: 'hsl(var(--error))'
    			},
    			info: {
    				DEFAULT: 'hsl(var(--info))'
    			},
    			chart: {
    				'1': 'hsl(var(--chart-1))',
    				'2': 'hsl(var(--chart-2))',
    				'3': 'hsl(var(--chart-3))',
    				'4': 'hsl(var(--chart-4))',
    				'5': 'hsl(var(--chart-5))'
    			}
    		}
    	}
    },
	plugins: [tailwindcssAnimate], // 用 import 方式載入 Plugin
  };
  