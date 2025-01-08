---
title: Introduktion 
description: Introduktion til MinePay plugin.
---

Dette dokument indeholder information om MinePay plugin, og hvordan du kan bruge det i dit eget plugin.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Installation
### Repository
<Tabs groupId="buildTool">
  <TabItem value="gradle.kts" label="Gradle (Kotlin)" default>
    ```gradle title="build.gradle.kts"
    repositories {
        mavenCentral()
    }
    ```
  </TabItem>
  <TabItem value="gradle" label="Gradle">
    ```gradle title="build.gradle"
    repositories {
        mavenCentral()
    }
    ```
  </TabItem>
  <TabItem value="maven" label="maven">
    Maven kræver ikke nogen specifik konfiguration.
  </TabItem>
</Tabs>

### Dependency
<Tabs groupId="buildTool">
  <TabItem value="gradle.kts" label="Gradle (Kotlin)" default>
    ```gradle title="build.gradle.kts"
    dependencies {
        // Hvis du vil shade det så skal du bruge implementation, og hvis du ikke vil shade det så skal du bruge compileOnly
        implementation("dk.minepay:api-bukkit:0.0.3")
        // compileOnly("dk.minepay:api-bukkit:0.0.3")
    }
    ```
  </TabItem>
  <TabItem value="gradle" label="Gradle">
    ```gradle title="build.gradle"
    dependencies {
        // Hvis du vil shade det så skal du bruge implementation, og hvis du ikke vil shade det så skal du bruge compileOnly
        implementation 'dk.minepay:api-bukkit:0.0.3'
        // compileOnly 'dk.minepay:api-bukkit:0.0.3'
    }
    ```
  </TabItem>
  <TabItem value="maven" label="maven">
    ```xml title="pom.xml"
    <dependency>
        <groupId>dk.minepay</groupId>
        <artifactId>api-bukkit</artifactId>
        <version>0.0.3</version>
        <!--
            Hvis du ikke vil shade det, så skal du bruge provided i stedet for compile
        -->
        <scope>compile</scope>
    </dependency>
    ```
  </TabItem>
</Tabs>

## Shade MinePay API
Hvis du vil shade MinePay API'en ind i dit plugin, så du ikke behøver at kræve at brugeren har MinePay installeret, kan du bruge `shadow` plugin til Gradle eller `maven-shade-plugin` til Maven.

<Tabs groupId="buildTool">
    <TabItem value="gradle.kts" label="Gradle (Kotlin)" default>
        ```gradle title="build.gradle.kts"
        plugins {
            id("com.gradleup.shadow") version "9.0.0-beta4"
        }

        tasks {
            withType<ShadowJar> {
                // Husk at relocate minepay-api til dit eget namespace
                relocate("dk.minepay", "dit.eget.navnerum")
            }
        }
        ```
    </TabItem>
    <TabItem value="gradle" label="Gradle">
        ```gradle title="build.gradle"
        plugins {
            id 'com.gradleup.shadow' version '9.0.0-beta4'
        }

        shadowJar {
            // Husk at relocate minepay-api til dit eget namespace
            relocate 'dk.minepay', 'dit.eget.navnerum'
        }
        ```
    </TabItem>
    <TabItem value="maven" label="Maven">
        ```xml title="pom.xml"
        <build>
            <plugins>
                <plugin>
                    <groupId>org.apache.maven.plugins</groupId>
                    <artifactId>maven-shade-plugin</artifactId>
                    <version>3.6.0</version>
                    <configuration>
                        <relocations>
                            <relocation>
                                <pattern>dk.minepay</pattern>
                                <shadedPattern>dit.eget.navnerum</shadedPattern>
                            </relocation>
                        </relocations>
                    </configuration>
                    <executions>
                        <execution>
                            <phase>package</phase>
                            <goals>
                                <goal>shade</goal>
                            </goals>
                        </execution>
                    </executions>
                </plugin>
            </plugins>
        </build>
        ```
    </TabItem>
</Tabs>
