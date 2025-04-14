package com.HTTN.thitn;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ThitnApplication {

	public static void main(String[] args) {
		//Dotenv.load();
		SpringApplication.run(ThitnApplication.class, args);
	}
}