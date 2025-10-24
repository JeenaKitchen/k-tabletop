import themeService from './themeService';

class SearchService {
  constructor() {
    this.allRecipes = null;
    this.isLoading = false;
  }

  // Get all recipes from all themes
  async getAllRecipes(forceRefresh = false) {
    if (this.allRecipes && !forceRefresh) {
      return this.allRecipes;
    }

    if (this.isLoading) {
      return this.allRecipes || [];
    }

    this.isLoading = true;

    try {
      const { themes } = await themeService.getThemes(forceRefresh);
      const allRecipes = [];

      themes.forEach((theme, themeIndex) => {
        if (theme.dishes && Array.isArray(theme.dishes)) {
          theme.dishes.forEach((recipe) => {
            allRecipes.push({
              ...recipe,
              themeName: theme.name,
              themeIndex
            });
          });
        }
      });

      this.allRecipes = allRecipes;
      return allRecipes;
    } catch (error) {
      console.error('Error loading recipes for search:', error);
      return [];
    } finally {
      this.isLoading = false;
    }
  }

  // Search recipes by name, description, and ingredients
  async searchRecipes(query) {
    if (!query || query.trim().length === 0) {
      return [];
    }

    const normalizedQuery = query.toLowerCase().trim();
    const allRecipes = await this.getAllRecipes();

    const results = allRecipes.filter((recipe) => {
      // Search in name
      if (recipe.name && recipe.name.toLowerCase().includes(normalizedQuery)) {
        return true;
      }

      // Search in Korean name
      if (recipe.koreanName && recipe.koreanName.includes(query)) {
        return true;
      }

      // Search in description
      if (recipe.description && recipe.description.toLowerCase().includes(normalizedQuery)) {
        return true;
      }

      // Search in Korean description
      if (recipe.koreanDescription && recipe.koreanDescription.includes(query)) {
        return true;
      }

      // Search in ingredients
      if (recipe.ingredients && Array.isArray(recipe.ingredients)) {
        const hasIngredientMatch = recipe.ingredients.some((ingredient) => {
          if (typeof ingredient === 'string') {
            return ingredient.toLowerCase().includes(normalizedQuery);
          }
          return false;
        });
        if (hasIngredientMatch) return true;
      }

      // Search in Korean ingredients
      if (recipe.koreanIngredients && Array.isArray(recipe.koreanIngredients)) {
        const hasKoreanIngredientMatch = recipe.koreanIngredients.some((ingredient) => {
          if (typeof ingredient === 'string') {
            return ingredient.includes(query);
          }
          return false;
        });
        if (hasKoreanIngredientMatch) return true;
      }

      // Search in Korean instructions
      if (recipe.instructions && Array.isArray(recipe.instructions)) {
        const hasKoreanInstructionMatch = recipe.instructions.some((instruction) => {
          if (instruction.koreanStepName && instruction.koreanStepName.includes(query)) {
            return true;
          }
          if (instruction.koreanDescription && instruction.koreanDescription.includes(query)) {
            return true;
          }
          return false;
        });
        if (hasKoreanInstructionMatch) return true;
      }

      return false;
    });

    // Sort results: exact name matches first, then partial matches
    results.sort((a, b) => {
      const aNameMatch = a.name.toLowerCase() === normalizedQuery;
      const bNameMatch = b.name.toLowerCase() === normalizedQuery;
      
      if (aNameMatch && !bNameMatch) return -1;
      if (!aNameMatch && bNameMatch) return 1;
      
      const aNameStartsWith = a.name.toLowerCase().startsWith(normalizedQuery);
      const bNameStartsWith = b.name.toLowerCase().startsWith(normalizedQuery);
      
      if (aNameStartsWith && !bNameStartsWith) return -1;
      if (!aNameStartsWith && bNameStartsWith) return 1;
      
      return 0;
    });

    return results;
  }

  // Clear cache
  clearCache() {
    this.allRecipes = null;
  }
}

export default new SearchService();

