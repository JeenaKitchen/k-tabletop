import { themeConfig } from '../data/themeConfig';
import { themes as staticThemes } from '../data/themes';
import markdownService from './markdownService';

class ThemeService {
  constructor() {
    this.themes = null;
    this.isLoading = false;
    this.error = null;
  }

  // Combine static theme config with dynamic markdown dishes
  async buildThemes() {
    const themes = [];

    for (const themeConfigItem of themeConfig) {
      try {
        // First try to get markdown dishes
        const markdownDishes = await markdownService.getRecipesForTheme(themeConfigItem.name);
        
        // Check if we have static dishes with Korean translations
        const staticTheme = staticThemes.find(theme => theme.name === themeConfigItem.name);
        const staticDishes = staticTheme ? staticTheme.dishes : [];
        
        // Use static dishes if they have Korean translations, otherwise use markdown dishes
        const dishesToUse = staticDishes.length > 0 && staticDishes.some(dish => dish.koreanName) 
          ? staticDishes 
          : markdownDishes;
        
        themes.push({
          ...themeConfigItem,
          dishes: dishesToUse
        });
      } catch (error) {
        console.error(`Error loading recipes for theme ${themeConfigItem.name}:`, error);
        
        // Try to find static dishes as fallback
        const staticTheme = staticThemes.find(theme => theme.name === themeConfigItem.name);
        const fallbackDishes = staticTheme ? staticTheme.dishes : [];
        
        themes.push({
          ...themeConfigItem,
          dishes: fallbackDishes
        });
      }
    }

    return themes;
  }

  // Get all themes with dishes from markdown
  async getThemes(forceRefresh = false) {
    if (this.themes && !forceRefresh) {
      return {
        themes: this.themes,
        isLoading: false,
        error: null
      };
    }

    if (this.isLoading) {
      return {
        themes: this.themes,
        isLoading: true,
        error: this.error
      };
    }

    this.isLoading = true;
    this.error = null;

    try {
      this.themes = await this.buildThemes();
      
      return {
        themes: this.themes,
        isLoading: false,
        error: null
      };
    } catch (error) {
      console.error('Error loading themes:', error);
      this.error = error.message;
      
      // If we have cached themes, return them
      if (this.themes) {
        return {
          themes: this.themes,
          isLoading: false,
          error: this.error
        };
      }
      
      // Otherwise, return empty themes with error
      return {
        themes: [],
        isLoading: false,
        error: this.error
      };
    } finally {
      this.isLoading = false;
    }
  }

  // Get a specific theme by index
  async getTheme(index, forceRefresh = false) {
    const result = await this.getThemes(forceRefresh);
    const theme = result.themes[index] || null;
    
    return {
      theme,
      isLoading: result.isLoading,
      error: result.error
    };
  }

  // Clear cache and force refresh
  async refreshThemes() {
    markdownService.clearCache();
    this.themes = null;
    return await this.getThemes(true);
  }
}

export default new ThemeService();