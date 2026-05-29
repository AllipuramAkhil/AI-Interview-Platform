import java.io.FileWriter;
import java.io.IOException;

public class GenerateQuestions {

    public static void main(String[] args) {

        String[] categories = {
                "frontend",
                "backend",
                "java",
                "aiml",
                "os",
                "dbms",
                "cn",
                "hr"
        };

        try {

            FileWriter writer =
                    new FileWriter("questions.sql");

            writer.write(
                    "USE interview_platform;\n\n"
            );

            writer.write(
                    "INSERT INTO questions " +
                    "(title, category, difficulty, answer) VALUES\n\n"
            );

            for (String category : categories) {

                for (int i = 1; i <= 300; i++) {

                    String difficulty;

                    if (i % 3 == 0) {
                        difficulty = "hard";
                    }

                    else if (i % 2 == 0) {
                        difficulty = "medium";
                    }

                    else {
                        difficulty = "easy";
                    }

                    String title =
                            "Explain " +
                            category +
                            " concept " + i;

                    String answer =
                            "Sample answer for " +
                            category +
                            " question " + i;

                    writer.write(
                            "('" +
                            title +
                            "', '" +
                            category +
                            "', '" +
                            difficulty +
                            "', '" +
                            answer +
                            "')"
                    );

                    if (!(category.equals("hr") && i == 300)) {
                        writer.write(",\n");
                    }

                    else {
                        writer.write(";");
                    }
                }
            }

            writer.close();

            System.out.println(
                    "questions.sql generated successfully"
            );

        }

        catch (IOException e) {

            e.printStackTrace();
        }
    }
}